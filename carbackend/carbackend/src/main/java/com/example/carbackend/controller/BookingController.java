package com.example.carbackend.controller;

import com.example.carbackend.model.Booking;
import com.example.carbackend.model.User;
import com.example.carbackend.repository.UserRepository;
import com.example.carbackend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Hello from Backend - Security Bypass Active!");
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(bookingService.getUserBookings(user.getId()));
    }

    @Autowired
    private com.example.carbackend.repository.CarRepository carRepository;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking, Authentication authentication) {
        System.out.println(">>> Entering createBooking controller...");
        System.out.println(">>> Incoming Start Date: " + booking.getStartDate());
        System.out.println(">>> Incoming End Date: " + booking.getEndDate());
        System.out.println(">>> Incoming Car ID: " + (booking.getCar() != null ? booking.getCar().getId() : "NULL"));
        
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User must be logged in to book.");
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found in system.");
        }

        if (booking.getCar() == null || booking.getCar().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Car ID must be provided.");
        }

        long carId = booking.getCar().getId().longValue();
        com.example.carbackend.model.Car actualCar = carRepository.findById(carId).orElse(null);
        if (actualCar == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Selected car does not exist.");
        }

        booking.setUser(user);
        booking.setCar(actualCar);
        booking.setStatus("PENDING");

        // Double check date logic to prevent 500 errors
        if (booking.getStartDate() == null || booking.getEndDate() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Start and End dates are required.");
        }

        if (booking.getStartDate().isAfter(booking.getEndDate())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Start date cannot be after end date.");
        }

        // Ensure totalPrice is set (calculation fallback)
        if (booking.getTotalPrice() == null || booking.getTotalPrice() <= 0) {
            long days = java.time.temporal.ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
            if (days <= 0) days = 1; // Minimum 1 day
            booking.setTotalPrice(days * actualCar.getPrice());
        }
        
        try {
            System.out.println("Attempting to save booking for User: " + user.getEmail() + " Car: " + actualCar.getId());
            Booking savedBooking = bookingService.createBooking(booking);
            System.out.println("Booking saved successfully with ID: " + savedBooking.getId());
            
            // Serialization Guard: Return a simple map to avoid Hibernate Proxy issues
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("id", savedBooking.getId());
            response.put("message", "Booking created successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // DEEP LOGGING: Find the actual root cause (e.g. MySQL constraint error)
            Throwable cause = e;
            while (cause.getCause() != null) {
                cause = cause.getCause();
            }
            System.err.println(">>> ROOT CAUSE: " + cause.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database Error: " + cause.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id).orElse(null);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }
}
