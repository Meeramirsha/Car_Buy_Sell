import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SellComponent {
  car = {
    make: '',
    model: '',
    year: undefined as number | undefined,
    mileage: undefined as number | undefined,
    price: undefined as number | undefined,
    description: '',
    contactPhone: '',
    contactEmail: '',
    color: '',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    image: '',
    features: [] as string[]
  };

  successMessage = '';
  showSuccess = false;
  newFeature = '';

  constructor(private carService: CarService, private router: Router) {}

  onSubmit() {
    if (this.validateForm()) {
      console.log('Submitting car:', this.car);
      
      // Add the car to the service
      this.carService.addCar(this.car);
      
      // Show success message
      this.showSuccess = true;
      this.successMessage = 'Your car has been listed successfully!';
      
      // Reset the form
      this.resetForm();
      
      // Redirect to car list after a delay
      setTimeout(() => {
        console.log('Navigating to car list');
        this.router.navigate(['/cars']);
      }, 2000);
    } else {
      console.log('Form validation failed');
      alert('Please fill in all required fields');
    }
  }

  validateForm(): boolean {
    // Basic validation
    return !!(this.car.make && 
              this.car.model && 
              this.car.year && 
              this.car.mileage && 
              this.car.price && 
              this.car.description);
  }

  useDefaultImage() {
    this.car.image = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80';
  }
  
  addFeature() {
    if (this.newFeature.trim()) {
      if (!this.car.features) {
        this.car.features = [];
      }
      this.car.features.push(this.newFeature.trim());
      this.newFeature = '';
    }
  }
  
  removeFeature(index: number) {
    if (this.car.features && index >= 0 && index < this.car.features.length) {
      this.car.features.splice(index, 1);
    }
  }

  resetForm() {
    this.car = {
      make: '',
      model: '',
      year: undefined,
      mileage: undefined,
      price: undefined,
      description: '',
      contactPhone: '',
      contactEmail: '',
      color: '',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      image: '',
      features: []
    };
  }
}
