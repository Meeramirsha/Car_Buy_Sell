import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading: boolean = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching bookings", err);
        this.loading = false;
      }
    });
  }

  updateStatus(bookingId: number, status: string): void {
    // Optional: Add logic to update booking status from admin view
    this.bookingService.updateBookingStatus(bookingId, status).subscribe({
      next: () => {
        alert(`Booking status updated to ${status}`);
        this.loadBookings();
      },
      error: (err) => alert("Failed to update status")
    });
  }
}
