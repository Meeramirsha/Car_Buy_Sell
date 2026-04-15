import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CarService, Car } from '../services/car.service';
import { WishlistService } from '../services/wishlist.service';
import { ComparisonService } from '../services/comparison.service';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  wishlistIds: Set<number> = new Set();
  comparisonCount: number = 0;
  
  selectedPriceRange = 'Any';
  selectedMake = 'Any';
  
  constructor(
    private carService: CarService, 
    private wishlistService: WishlistService,
    private comparisonService: ComparisonService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadWishlist();
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
      this.filteredCars = [...this.cars];
    });
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (cars) => {
        this.wishlistIds = new Set(cars.map(c => c.id));
      },
      error: (err) => console.error('Error loading wishlist:', err)
    });
  }

  // Helper methods for the template
  public isWishlisted(carId: number): boolean {
    return this.wishlistIds.has(carId);
  }

  public toggleWishlist(car: any): void {
    if (this.isWishlisted(car.id)) {
      this.wishlistService.removeFromWishlist(car.id).subscribe(() => {
        this.wishlistIds.delete(car.id);
      });
    } else {
      this.wishlistService.addToWishlist(car.id).subscribe(() => {
        this.wishlistIds.add(car.id);
      });
    }
  }
  
  public applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const makeMatch = this.selectedMake === 'Any' || car.make === this.selectedMake;
      let priceMatch = true;
      if (this.selectedPriceRange === 'Under ₹5,00,000') {
        priceMatch = car.price < 500000;
      } else if (this.selectedPriceRange === '₹5,00,000 - ₹10,00,000') {
        priceMatch = car.price >= 500000 && car.price <= 1000000;
      } else if (this.selectedPriceRange === '₹10,00,000 - ₹20,00,000') {
        priceMatch = car.price > 1000000 && car.price <= 2000000;
      } else if (this.selectedPriceRange === '₹20,00,000+') {
        priceMatch = car.price > 2000000;
      }
      return makeMatch && priceMatch;
    });
  }

  // Diagnostic Renamed Methods
  public checkSelected(carId: any): boolean {
    return this.comparisonService.isCarSelected(carId);
  }

  public handleToggle(car: any): void {
    this.comparisonService.toggleCarSelection(car);
    this.comparisonCount = this.comparisonService.getSelectionCount();
  }

  public openDetails(car: any): void {
    this.router.navigate(['/booking', car.id]);
  }

  public startCompare(): void {
    const selected = this.comparisonService.getSelectedCars();
    if (selected.length === 2) {
      this.router.navigate(['/compare'], { 
        queryParams: { car1: selected[0].id, car2: selected[1].id } 
      });
    }
  }
}
