import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SellService, SellRequest } from '../services/sell.service';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SellComponent {
  sellRequest: SellRequest = {
    ownerName: '',
    phone: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    fuelType: 'Petrol',
    expectedPrice: 0,
    predictedPrice: 0
  };

  successMessage = '';
  showSuccess = false;
  errorMessage = '';

  isPredicting = false;

  constructor(private sellService: SellService, private router: Router) {}

  getPrediction() {
    if (!this.sellRequest.brand || !this.sellRequest.year || !this.sellRequest.mileage) {
        this.errorMessage = "Please fill in Brand, Year and Mileage first.";
        return;
    }

    this.isPredicting = true;
    const predictionData = {
        brand: this.sellRequest.brand,
        year: this.sellRequest.year,
        mileage: this.sellRequest.mileage,
        fuel_type: this.sellRequest.fuelType
    };

    this.sellService.predictPrice(predictionData).subscribe({
        next: (res) => {
            this.sellRequest.predictedPrice = res.predicted_price;
            this.isPredicting = false;
            this.errorMessage = '';
        },
        error: (err) => {
            this.errorMessage = "AI Prediction Service currently unavailable.";
            this.isPredicting = false;
        }
    });
  }

  onSubmit() {
    this.sellService.submitSellRequest(this.sellRequest).subscribe({
      next: (res) => {
        this.showSuccess = true;
        this.successMessage = 'Your car has been listed for verification successfully!';
        this.errorMessage = '';
        this.resetForm();
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit request. Please check your network and try again.';
        this.showSuccess = false;
      }
    });
  }

  resetForm() {
    this.sellRequest = {
      ownerName: '',
      phone: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      fuelType: 'Petrol',
      expectedPrice: 0,
      predictedPrice: 0
    };
  }
}
