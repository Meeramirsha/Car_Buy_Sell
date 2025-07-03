import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  faqs = [
    {
      question: 'How do I list my car for sale?',
      answer: 'To list your car, navigate to the "Sell" section and click on "Add Car". Fill out the required information about your vehicle and submit the form.'
    },
    {
      question: 'How do I contact a seller?',
      answer: 'On any car listing, click the "Contact Seller" button to view the seller\'s contact information. You can then reach out via phone or email.'
    },
    {
      question: 'Is there a fee for listing my car?',
      answer: 'Basic listings are free. Premium listings with featured placement and additional photos have a small fee.'
    },
    {
      question: 'How long will my listing stay active?',
      answer: 'Standard listings remain active for 30 days. You can renew or remove your listing at any time from your account dashboard.'
    },
    {
      question: 'Can I edit my listing after posting?',
      answer: 'Yes, you can edit your listing details at any time through your account dashboard under "My Listings".'
    }
  ];
}