import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {
  constructor(private router: Router) {}

  viewDetails(offerType: string) {
    console.log(`Viewing details for: ${offerType}`);
    // Navigate to a details page or show a modal with more information
    // For now, we'll navigate to a hypothetical details page
    try {
      console.log('Router before navigation:', this.router);
      this.router.navigate(['/offers/details'], { queryParams: { offer: offerType } });
      console.log('Navigation completed');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }

  checkEligibility() {
    console.log('Checking financing eligibility');
    // Navigate to the financing page
    try {
      this.router.navigate(['/financing']);
      console.log('Navigation to financing completed');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }

  browseDeals() {
    console.log('Browsing deals');
    // Navigate to the car list page
    try {
      this.router.navigate(['/cars']);
      console.log('Navigation to cars completed');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
}
