package com.example.carbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sell_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerName;
    private String phone;
    private String brand;
    private String model;
    private int year;
    private int mileage;
    private String fuelType;
    private double expectedPrice;
    private double predictedPrice;
    private String status; // PENDING, APPROVED, etc.
}
