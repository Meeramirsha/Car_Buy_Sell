import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManageCarsComponent } from '../manage-cars/manage-cars.component';
import { ManageBookingsComponent } from '../manage-bookings/manage-bookings.component';
import { ManageSellRequestsComponent } from './manage-sell-requests.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ManageCarsComponent, ManageBookingsComponent, ManageSellRequestsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  activeTab: string = 'cars'; // 'cars' or 'bookings'

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
