package com.example.carbackend.controller;

import com.example.carbackend.model.Car;
import com.example.carbackend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.example.carbackend.repository.BookingRepository;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Optional<Car> car = carService.getCarById(id);
        return car.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<List<Car>> createCars(@RequestBody List<Car> cars) {
        List<Car> savedCars = cars.stream()
                .map(carService::saveCar)
                .collect(Collectors.toList());
        return new ResponseEntity<>(savedCars, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car) {
        Optional<Car> existingCar = carService.getCarById(id);

        if (existingCar.isPresent()) {
            car.setId(id);
            Car updatedCar = carService.saveCar(car);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        Optional<Car> existingCar = carService.getCarById(id);

        if (existingCar.isPresent()) {
            carService.deleteCar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/make/{make}")
    public ResponseEntity<java.util.List<Car>> getCarsByMake(@PathVariable String make) {
        List<Car> cars = carService.getCarsByMake(make);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<java.util.List<Car>> getCarsByBrand(@PathVariable String brand) {
        // user requirement uses /brand/{brandName}, mapping to make
        java.util.List<Car> cars = carService.getCarsByMake(brand);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/bodytype/{type}")
    public ResponseEntity<java.util.List<Car>> getCarsByBodyType(@PathVariable String type) {
        java.util.List<Car> cars = carService.getCarsByBodyType(type);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/price-range/{range}")
    public ResponseEntity<java.util.List<Car>> getCarsByPriceRange(@PathVariable String range) {
        List<Car> cars = carService.getCarsByPriceRange(range);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }
    
    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/recommendations/{userId}")
    public ResponseEntity<java.util.List<Car>> getRecommendedCars(@PathVariable Long userId) {
        java.util.List<Car> recommendedCars = carService.getRecommendedCars(userId, bookingRepository);
        return new ResponseEntity<>(recommendedCars, HttpStatus.OK);
    }
}
