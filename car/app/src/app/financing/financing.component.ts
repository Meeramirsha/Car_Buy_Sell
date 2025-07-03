import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-financing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './financing.component.html',
  styleUrls: ['./financing.component.css']
})
export class FinancingComponent implements OnInit {
  carPrice: number = 25000;
  downPayment: number = 5000;
  loanTerm: number = 60; // months
  interestRate: number = 4.5; // percentage
  monthlyPayment: number = 0;
  
  constructor() {
    console.log('FinancingComponent initialized');
  }
  
  ngOnInit() {
    console.log('FinancingComponent ngOnInit');
  }

  // Calculate payment when button is clicked
  calculatePayment(): void {
    console.log('Calculate button clicked');
    
    // Get values from form
    const principal = this.carPrice - this.downPayment;
    const monthlyRate = this.interestRate / 100 / 12;
    const termInMonths = this.loanTerm;
    
    console.log('Loan details:', {
      principal,
      monthlyRate,
      termInMonths
    });
    
    // Calculate monthly payment
    if (monthlyRate === 0) {
      this.monthlyPayment = principal / termInMonths;
    } else {
      this.monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths) / 
                           (Math.pow(1 + monthlyRate, termInMonths) - 1);
    }
    
    console.log('Monthly payment calculated:', this.monthlyPayment);
  }
}