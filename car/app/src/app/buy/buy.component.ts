import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  cars = [
    {
      id: 1,
      make: 'Toyota',
      name: 'Camry',
      year: 2022,
      price: 25000,
      mileage: 15000,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 2,
      make: 'Honda',
      name: 'Accord',
      year: 2021,
      price: 22000,
      mileage: 18000,
      image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 3,
      make: 'Ford',
      name: 'Mustang',
      year: 2022,
      price: 35000,
      mileage: 10000,
      image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 4,
      make: 'BMW',
      name: '3 Series',
      year: 2021,
      price: 42000,
      mileage: 12000,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];
  
  filteredCars = [...this.cars];
  wishlist = [
    { id: 1, name: 'Toyota Camry', price: 25000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80' },
    { id: 2, name: 'Honda Accord', price: 22000, image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80' }
  ];
  
  selectedPriceRange = 'Any';
  selectedMake = 'Any';
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    this.filteredCars = [...this.cars];
  }
  
  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      // Filter by make
      const makeMatch = this.selectedMake === 'Any' || car.make === this.selectedMake;
      
      // Filter by price range
      let priceMatch = true;
      if (this.selectedPriceRange === 'Under $10,000') {
        priceMatch = car.price < 10000;
      } else if (this.selectedPriceRange === '$10,000 - $20,000') {
        priceMatch = car.price >= 10000 && car.price <= 20000;
      } else if (this.selectedPriceRange === '$20,000 - $30,000') {
        priceMatch = car.price > 20000 && car.price <= 30000;
      } else if (this.selectedPriceRange === '$30,000+') {
        priceMatch = car.price > 30000;
      }
      
      return makeMatch && priceMatch;
    });
  }
  
  removeFromWishlist(car: any) {
    this.wishlist = this.wishlist.filter(item => item.id !== car.id);
  }
  
  viewCarDetails(car: any) {
    // Navigate to car details page (for now, just go to car list)
    this.router.navigate(['/cars']);
  }
}
