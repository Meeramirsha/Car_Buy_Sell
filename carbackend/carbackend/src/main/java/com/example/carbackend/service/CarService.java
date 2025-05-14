package com.example.carbackend.service;

import com.example.carbackend.model.Car;
import com.example.carbackend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
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

    public List<Car> getCarsByMake(String make) {
        return carRepository.findByMake(make);
    }

    public List<Car> getCarsByPriceRange(String priceRange) {
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
}
