package com.example.carbackend.Config;

import com.example.carbackend.model.Car;
import com.example.carbackend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CarRepository carRepository;

    @Autowired
    public DataInitializer(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) {
        // Only initialize if the database is empty
        if (carRepository.count() == 0) {
            // Create cars with proper initialization
            Car car1 = new Car();
            car1.setMake("Toyota");
            car1.setModel("Corolla");
            car1.setYear(2022);
            car1.setPrice(20000);
            car1.setMileage(15000);
            car1.setFuelType("Gasoline");
            car1.setTransmission("Automatic");
            car1.setColor("Silver");
            car1.setDescription("This Toyota Corolla is in excellent condition with low mileage.");
            car1.setFeatures(Arrays.asList("Bluetooth", "Backup Camera", "Lane Departure Warning"));
            car1.setImage("https://images.unsplash.com/photo-1590362891991-f776e747a588");
            car1.setContactPhone("(555) 123-4567");
            car1.setContactEmail("seller1@example.com");
            
            Car car2 = new Car();
            car2.setMake("Honda");
            car2.setModel("Civic");
            car2.setYear(2021);
            car2.setPrice(22000);
            car2.setMileage(18500);
            car2.setFuelType("Gasoline");
            car2.setTransmission("CVT");
            car2.setColor("Blue");
            car2.setDescription("This Honda Civic offers excellent fuel economy and a comfortable ride.");
            car2.setFeatures(Arrays.asList("Honda Sensing Suite", "Touchscreen Infotainment", "Android Auto"));
            car2.setImage("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf");
            car2.setContactPhone("(555) 234-5678");
            car2.setContactEmail("seller2@example.com");
            
            Car car3 = new Car();
            car3.setMake("Ford");
            car3.setModel("Focus");
            car3.setYear(2020);
            car3.setPrice(18000);
            car3.setMileage(25000);
            car3.setFuelType("Gasoline");
            car3.setTransmission("Manual");
            car3.setColor("Red");
            car3.setDescription("This Ford Focus offers a sporty driving experience with responsive handling.");
            car3.setFeatures(Arrays.asList("SYNC 3 Infotainment", "Keyless Entry", "Alloy Wheels"));
            car3.setImage("https://images.unsplash.com/photo-1551830820-330a71b99659");
            car3.setContactPhone("(555) 345-6789");
            car3.setContactEmail("seller3@example.com");
            
            List<Car> initialCars = Arrays.asList(car1, car2, car3);

            carRepository.saveAll(initialCars);
        }
    }
}
