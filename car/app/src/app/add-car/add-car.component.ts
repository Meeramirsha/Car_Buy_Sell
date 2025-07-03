import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-car.component.html',
})
export class AddCarComponent {
  car = {
    make: '',
    model: '',
    year: undefined,
    mileage: undefined,
    price: undefined,
    description: '',
    image: '',  // Changed from photos to match the backend model
    contactPhone: '',
    contactEmail: '',
    fuelType: 'Gasoline',  // Added default values for additional fields
    transmission: 'Automatic',
    color: '',
    features: []
  };

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Submitting car:', this.car);
    
    // Call the service to add the car to the backend
    this.carService.addCar(this.car).subscribe(
      newCar => {
        console.log('Car added successfully:', newCar);
        alert('Car added successfully!');
        
        // Clear form after submission
        this.car = {
          make: '',
          model: '',
          year: undefined,
          mileage: undefined,
          price: undefined,
          description: '',
          image: '',
          contactPhone: '',
          contactEmail: '',
          fuelType: 'Gasoline',
          transmission: 'Automatic',
          color: '',
          features: []
        };
        
        // Navigate to the car list page
        this.router.navigate(['/cars']);
      },
      error => {
        console.error('Error adding car:', error);
        alert('Error adding car. Please try again.');
      }
    );
  }
}
