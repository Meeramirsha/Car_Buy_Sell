import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService, Car } from '../services/car.service';

@Component({
  selector: 'app-manage-cars',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent implements OnInit {
  cars: Car[] = [];
  carData: Partial<Car> = this.resetCarForm();
  isEditing: boolean = false;
  showForm: boolean = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => this.cars = data);
  }

  resetCarForm(): Partial<Car> {
    return {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      description: '',
      image: '',
      availability: true
    };
  }

  toggleForm(car?: Car): void {
    if (car) {
      this.carData = { ...car };
      this.isEditing = true;
      this.showForm = true;
    } else {
      this.isEditing = false;
      this.carData = this.resetCarForm();
      this.showForm = !this.showForm;
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.carService.updateCar(this.carData as Car).subscribe({
        next: () => {
          alert("Car updated successfully!");
          this.showForm = false;
          this.isEditing = false;
        },
        error: (err) => alert("Failed to update car")
      });
    } else {
      this.carService.addCar(this.carData).subscribe({
        next: () => {
          alert("Car added successfully!");
          this.showForm = false;
          this.carData = this.resetCarForm();
        },
        error: (err) => alert("Failed to add car")
      });
    }
  }

  deleteCar(id: number): void {
    if (confirm("Are you sure you want to delete this car?")) {
      this.carService.removeCar(id).subscribe({
        next: () => alert("Car deleted successfully"),
        error: (err) => alert("Failed to delete car")
      });
    }
  }
}
