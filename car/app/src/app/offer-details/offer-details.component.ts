import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offer-details.component.html',
  styleUrl: './offer-details.component.css'
})
export class OfferDetailsComponent implements OnInit {
  offerType: string | null = null;
  offerDetails: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the offer type from the query parameters
    this.route.queryParams.subscribe(params => {
      this.offerType = params['offer'];
      this.loadOfferDetails(this.offerType);
    });
  }

  loadOfferDetails(offerType: string | null): void {
    // This would typically come from a service, but for now we'll hardcode some details
    if (offerType === 'summer-sale') {
      this.offerDetails = {
        title: 'Summer Sale',
        description: 'Get up to 15% off on selected vehicles until the end of the month.',
        details: 'This limited-time offer applies to all 2023 models in stock. The discount varies by model and trim level. Contact our sales team for specific pricing on the vehicle you\'re interested in.',
        validUntil: 'August 31, 2023',
        termsAndConditions: 'Cannot be combined with other offers. Subject to credit approval. Tax, title, and license fees extra.'
      };
    } else if (offerType === 'first-time-buyer') {
      this.offerDetails = {
        title: 'First-Time Buyer Program',
        description: 'Special financing options available for first-time car buyers.',
        details: 'Our First-Time Buyer Program is designed to help you get behind the wheel of your first car with competitive rates and flexible terms. No co-signer required for qualified applicants.',
        benefits: [
          'Competitive interest rates',
          'Low down payment options',
          'Flexible loan terms up to 72 months',
          'Build your credit history'
        ],
        requirements: 'Must be at least 18 years old with valid ID, proof of income, and no previous auto loans.'
      };
    } else if (offerType === 'trade-in-bonus') {
      this.offerDetails = {
        title: 'Trade-In Bonus',
        description: 'Get an extra $1,000 when you trade in your old vehicle.',
        details: 'Bring in your current vehicle and receive a $1,000 bonus on top of its appraised value when you purchase a new or certified pre-owned vehicle from our inventory.',
        eligibility: 'Trade-in vehicle must be in drivable condition with clean title. The bonus will be applied as a discount to your new vehicle purchase.',
        validUntil: 'December 31, 2023'
      };
    } else {
      this.offerDetails = {
        title: 'Special Offer',
        description: 'Please contact our sales team for more information about this offer.',
        details: 'We have many special offers available. Visit our showroom or call us to learn more about current promotions and how they can be applied to your purchase.'
      };
    }
  }

  goBack(): void {
    this.router.navigate(['/offers']);
  }
}