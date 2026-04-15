package com.example.carbackend.controller;

import com.example.carbackend.model.Car;
import com.example.carbackend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> getRecommendations(
            @RequestParam(required = false) Double budget,
            @RequestParam(required = false) Integer familySize,
            @RequestParam(required = false) String fuelPreference) {
        
        List<Car> allCars = carService.getAllCars();

        List<Car> recommended = allCars.stream().filter(car -> {
            boolean matches = true;

            // Rule 1: Budget < 8 Lakh -> recommend hatchbacks
            if (budget != null && budget < 800000) {
                if (!"Hatchback".equalsIgnoreCase(car.getBodyType())) {
                    matches = false;
                }
            }

            // Rule 2: Family size >= 5 -> recommend SUV
            if (familySize != null && familySize >= 5) {
                if (!"SUV".equalsIgnoreCase(car.getBodyType())) {
                    matches = false;
                }
            }

            // Rule 3: Fuel preference
            if (fuelPreference != null && !fuelPreference.isEmpty()) {
                if (!fuelPreference.equalsIgnoreCase(car.getFuelType())) {
                    matches = false;
                }
            }

            // Rule 4: Hard budget limit
            if (budget != null && car.getPrice() > budget) {
                matches = false;
            }

            return matches;
        }).collect(Collectors.toList());

        // Return up to 6 recommendations
        return ResponseEntity.ok(recommended.stream().limit(6).collect(Collectors.toList()));
    }
}
