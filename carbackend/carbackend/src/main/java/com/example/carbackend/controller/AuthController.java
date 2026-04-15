package com.example.carbackend.controller;

import com.example.carbackend.model.PasswordResetToken;
import com.example.carbackend.model.User;
import com.example.carbackend.repository.PasswordResetTokenRepository;
import com.example.carbackend.repository.UserRepository;
import com.example.carbackend.security.AuthRequest;
import com.example.carbackend.security.AuthResponse;
import com.example.carbackend.security.JwtUtil;
import com.example.carbackend.security.RegisterRequest;
import com.example.carbackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allows Angular frontend to connect during dev
@SuppressWarnings("all") // Suppress all warnings including null safety
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            System.out.println("--- Login Attempt ---");
            System.out.println("Email: " + authRequest.getEmail());
            // Check if user exists in DB first for logging
            boolean exists = userRepository.existsByEmail(authRequest.getEmail());
            System.out.println("User exists in database: " + exists);
            
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
            System.out.println("Status: SUCCESS");
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            System.err.println("Status: FAILED - Incorrect Password for " + authRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        } catch (Exception e) {
            System.err.println("Status: ERROR - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login error: " + e.getMessage());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        
        // Find user to return role
        User user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(new AuthResponse(jwt, user.getEmail(), user.getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Registration attempt for email: " + registerRequest.getEmail());
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            System.err.println("Registration failed: Email already exists: " + registerRequest.getEmail());
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole() != null ? registerRequest.getRole() : "USER")
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            // For security reasons, don't reveal if user exists
            return ResponseEntity.ok("If that email is registered, you will receive a reset link shortly.");
        }

        // Generate token
        String token = UUID.randomUUID().toString();
        
        // Delete existing tokens for this user
        // We'll use a manual check or handle uniquely in DB
        tokenRepository.findByUser(user).ifPresent(t -> tokenRepository.delete(t));

        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(24))
                .build();
        
        tokenRepository.save(resetToken);

        // Send Email
        try {
            String resetLink = "http://localhost:4200/#/reset-password?token=" + token;
            emailService.sendResetPasswordEmail(user.getEmail(), resetLink);
            return ResponseEntity.ok("Reset link sent successfully!");
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email. Please try again later.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        PasswordResetToken resetToken = tokenRepository.findByToken(token).orElse(null);

        if (resetToken == null || resetToken.isExpired()) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Success - delete the token
        tokenRepository.delete(resetToken);

        return ResponseEntity.ok("Password reset successfully!");
    }
}
