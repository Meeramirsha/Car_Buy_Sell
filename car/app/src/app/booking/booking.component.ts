import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  carId!: number;
  car: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private carService: CarService,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.carId = Number(this.route.snapshot.paramMap.get('carId'));
    this.carService.getCarById(this.carId).subscribe({
      next: (data) => this.car = data,
      error: () => this.error = "Error loading car details"
    });
  }

  calculateDays(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  onSubmit() {
    if (this.bookingForm.valid && this.car) {
      const days = this.calculateDays(this.bookingForm.value.startDate, this.bookingForm.value.endDate);
      if (days <= 0) {
        this.error = "End date must be after start date.";
        return;
      }
      
      const totalPrice = days * this.car.price; 

      const bookingData = {
        car: { id: this.carId },
        startDate: this.bookingForm.value.startDate,
        endDate: this.bookingForm.value.endDate,
        totalPrice: totalPrice,
        status: 'PENDING'
      };

      this.bookingService.createBooking(bookingData).subscribe({
        next: (createdBooking) => {
          this.router.navigate(['/payment', createdBooking.id]);
        },
        error: (err) => {
          console.error('Booking Error:', err);
          this.error = err.error && typeof err.error === 'string' 
            ? err.error 
            : 'Failed to create booking. ' + (err.statusText || '');
        }
      });
    }
  }
}
