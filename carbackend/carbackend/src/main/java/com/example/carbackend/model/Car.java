package com.example.carbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private int year;
    private double price;
    private int mileage;
    private String fuelType;
    private String transmission;
    private String color;
    private String bodyType;
    private String description;

    // Store features as a comma-separated string
    private String featuresString;

    // Transient field for working with features as a list in Java code
    @Transient
    private List<String> features;

    private String image;
    private String contactPhone;
    private String contactEmail;
    
    private boolean availability = true;
    
    // Custom getter and setter for image to ensure proper URL handling
    public String getImage() {
        return image;
    }
    
    public void setImage(String image) {
        this.image = image;
    }
    
    // Getter and setter for features that convert between List and String
    public List<String> getFeatures() {
        if (featuresString == null || featuresString.isEmpty()) {
            return null;
        }
        return Arrays.asList(featuresString.split(","));
    }
    
    public void setFeatures(List<String> features) {
        if (features == null) {
            this.featuresString = null;
        } else {
            this.featuresString = features.stream().collect(Collectors.joining(","));
        }
        this.features = features;
    }
}
