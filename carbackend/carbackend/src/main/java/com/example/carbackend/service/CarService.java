package com.example.carbackend.service;

import com.example.carbackend.model.Car;
import com.example.carbackend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import com.example.carbackend.repository.BookingRepository;
import com.example.carbackend.model.Booking;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
import java.util.Map;

@Service
@SuppressWarnings("all")
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public java.util.List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public java.util.List<Car> getCarsByMake(String make) {
        return carRepository.findByMake(make);
    }

    public java.util.List<Car> getCarsByBodyType(String bodyType) {
        return carRepository.findByBodyType(bodyType);
    }

    public java.util.List<Car> getCarsByPriceRange(String priceRange) {
        switch (priceRange) {
            case "under15k":
                return carRepository.findByPriceLessThan(15000);
            case "15k-25k":
                return carRepository.findByPriceBetween(15000, 25000);
            case "over25k":
                return carRepository.findByPriceGreaterThan(25000);
            default:
                return carRepository.findAll();
        }
    }

    public java.util.List<Car> getRecommendedCars(Long userId, BookingRepository bookingRepository) {
        java.util.List<Booking> userBookings = bookingRepository.findByUserId(userId);

        if (userBookings.isEmpty()) {
            // Default: return newest or random cars if no history
            java.util.List<Car> allCars = carRepository.findAll();
            return allCars.stream().limit(3).toList();
        }

        // 1. Calculate preferred price range based on average past booking total price
        double avgSpent = userBookings.stream()
                .mapToDouble(b -> b.getTotalPrice() / ChronoUnit.DAYS.between(b.getStartDate(), b.getEndDate()))
                .average()
                .orElse(0.0);
        
        // 2. Find most frequent car make (representing preferred brand/type)
        String preferredMake = userBookings.stream()
                .map(b -> b.getCar().getMake())
                .collect(Collectors.groupingBy(m -> m, Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("");

        // 3. Simple AI: Score all available cars. +10 for matching make, -1 for every $1000 diff from average daily rate
        java.util.List<Car> allCars = carRepository.findAll();
        
        return allCars.stream()
                .sorted((c1, c2) -> {
                    double c1Score = 0;
                    double c2Score = 0;
                    
                    if (c1.getMake().equalsIgnoreCase(preferredMake)) c1Score += 10;
                    if (c2.getMake().equalsIgnoreCase(preferredMake)) c2Score += 10;
                    
                    // Penalty for price difference from preferred average (assuming car.price is full price, and rental is fraction)
                    double c1DailyRate = c1.getPrice() / 100; 
                    double c2DailyRate = c2.getPrice() / 100;
                    
                    c1Score -= Math.abs(c1DailyRate - avgSpent) / 100;
                    c2Score -= Math.abs(c2DailyRate - avgSpent) / 100;
                    
                    // Sort descending by score
                    return Double.compare(c2Score, c1Score);
                })
                .limit(3)
                .toList();
    }
}
