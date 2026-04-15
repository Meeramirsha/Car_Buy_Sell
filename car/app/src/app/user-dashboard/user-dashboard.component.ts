import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  bookings: any[] = [];

  constructor(public authService: AuthService, private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getMyBookings().subscribe({
      next: (data) => this.bookings = data,
      error: (err) => console.error("Could not fetch bookings", err)
    });
  }

  getConfirmedCount(): number {
    return this.bookings.filter(b => b.status === 'CONFIRMED').length;
  }

  getPendingCount(): number {
    return this.bookings.filter(b => b.status === 'PENDING').length;
  }
}
