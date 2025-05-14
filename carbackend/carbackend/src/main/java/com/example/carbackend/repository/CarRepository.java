package com.example.carbackend.repository;

import com.example.carbackend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByMake(String make);
    List<Car> findByPriceLessThan(double price);
    List<Car> findByPriceBetween(double minPrice, double maxPrice);
    List<Car> findByPriceGreaterThan(double price);
}
