package com.example.carbackend.controller;

import com.example.carbackend.model.Car;
import com.example.carbackend.model.User;
import com.example.carbackend.model.Wishlist;
import com.example.carbackend.repository.CarRepository;
import com.example.carbackend.repository.UserRepository;
import com.example.carbackend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
@SuppressWarnings("all")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public ResponseEntity<?> getMyWishlist(Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        List<Car> cars = wishlistRepository.findByUser(user)
                .stream()
                .map(Wishlist::getCar)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(cars);
    }

    @PostMapping("/{carId}")
    public ResponseEntity<?> addToWishlist(@PathVariable Long carId, Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        Car car = carRepository.findById(carId).orElse(null);

        if (user == null || car == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        if (wishlistRepository.findByUserAndCar(user, car).isPresent()) {
            return ResponseEntity.ok("Already in wishlist");
        }

        Wishlist wishlist = Wishlist.builder().user(user).car(car).build();
        wishlistRepository.save(wishlist);

        return ResponseEntity.ok("Added to wishlist");
    }

    @DeleteMapping("/{carId}")
    @Transactional
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long carId, Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User user = userRepository.findByEmail(authentication.getName()).orElse(null);
        Car car = carRepository.findById(carId).orElse(null);

        if (user == null || car == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        wishlistRepository.deleteByUserAndCar(user, car);
        return ResponseEntity.ok("Removed from wishlist");
    }
}
