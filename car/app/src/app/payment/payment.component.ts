import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  bookingId!: number;
  processing: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private bookingService: BookingService
  ) {
    this.paymentForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    if (this.bookingId) {
      this.loadBookingDetails();
    }
  }

  loadBookingDetails() {
    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (booking) => {
        if (booking && booking.totalPrice) {
          this.paymentForm.patchValue({
            amount: booking.totalPrice
          });
          console.log('Payment amount loaded:', booking.totalPrice);
        }
      },
      error: (err) => {
        console.error('Error loading booking for payment:', err);
        this.errorMessage = "Could not load booking details. Please try again.";
      }
    });
  }

  processPayment() {
    if (this.paymentForm.valid) {
      this.processing = true;
      this.errorMessage = '';
      
      const orderRequest = {
        bookingId: this.bookingId,
        amount: this.paymentForm.value.amount
      };

      // Create simulated order
      this.paymentService.createOrder(orderRequest).subscribe({
        next: (orderRes) => {
          this.simulatePaymentProcessing(orderRes);
        },
        error: (err) => {
          this.processing = false;
          this.errorMessage = "Failed to initiate payment. Please try again.";
        }
      });
    }
  }

  simulatePaymentProcessing(orderData: any) {
    // Artificial 2.5 second delay to simulate external gateway connection and user interaction
    setTimeout(() => {
      const simulatedRzpResponse = {
        razorpay_payment_id: 'pay_sim_' + Math.random().toString(36).substr(2, 9),
        razorpay_order_id: orderData.rzpOrderId,
        razorpay_signature: 'simulated_signature_hash'
      };
      
      this.verifyPayment(simulatedRzpResponse);
    }, 2500);
  }

  verifyPayment(rzpResponse: any) {
    const verifyRequest = {
      bookingId: this.bookingId,
      rzpPaymentId: rzpResponse.razorpay_payment_id,
      rzpOrderId: rzpResponse.razorpay_order_id,
      rzpSignature: rzpResponse.razorpay_signature
    };

    this.paymentService.verifyPayment(verifyRequest).subscribe({
      next: (res) => {
        this.processing = false;
        this.successMessage = "Payment successful! Booking confirmed.";
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        this.processing = false;
        this.errorMessage = "Payment verification failed.";
      }
    });
  }
}
