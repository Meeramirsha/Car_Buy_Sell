import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isSaving = false;
  
  user = {
    name: 'Meera',
    email: 'meera@gmail.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    profileImage: 'https://via.placeholder.com/150'
  };

  listings = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: 22500,
      image: 'https://via.placeholder.com/300x200',
      status: 'Active',
      views: 45,
      inquiries: 3
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      price: 18900,
      image: 'https://via.placeholder.com/300x200',
      status: 'Active',
      views: 32,
      inquiries: 2
    }
  ];

  wishlist = [
    {
      id: 3,
      make: 'Ford',
      model: 'Mustang',
      year: 2021,
      price: 35000,
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2020,
      price: 21000,
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  activeTab = 'profile';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  removeListing(id: number) {
    this.listings = this.listings.filter(listing => listing.id !== id);
  }

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(car => car.id !== id);
  }

  saveProfile() {
    // Set loading state
    this.isSaving = true;
    
    // In a real application, this would send the updated user data to a server
    console.log('Saving profile changes:', this.user);
    
    // Simulate a server request with a timeout
    setTimeout(() => {
      // Reset loading state
      this.isSaving = false;
      
      // Create a success message element
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success mt-3';
      successMessage.textContent = 'Profile updated successfully!';
      
      // Find the form element and append the success message
      const form = document.querySelector('.card-body form');
      if (form) {
        // Remove any existing success messages
        const existingMessages = form.parentElement?.querySelectorAll('.alert');
        existingMessages?.forEach(msg => msg.remove());
        
        // Add the new success message
        form.parentElement?.appendChild(successMessage);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    }, 1000); // Simulate a 1-second delay for the server request
  }
}