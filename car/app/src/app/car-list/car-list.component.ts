import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarService, Car } from '../services/car.service';
declare var bootstrap: any;

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  selectedPriceRange = 'all';
  selectedMake = 'all';
  selectedCar: Car | null = null;
  wishlist: Car[] = [];
  
  constructor(private carService: CarService, private route: ActivatedRoute) {}
  
  recommendedCars: Car[] = [];
  uniqueMakes: string[] = [];
  searchQuery: string = '';

  ngOnInit() {
  // Load wishlist from localStorage if available
  const savedWishlist = localStorage.getItem('carWishlist');
  if (savedWishlist) {
    this.wishlist = JSON.parse(savedWishlist);
    console.log('Wishlist loaded from localStorage:', this.wishlist);
  }
  
  // HACK: Hardcoding User ID 1 for the mock recommendation feature
  // In a real app we would get the user ID from AuthService
  this.carService.getRecommendedCars(1).subscribe(
    recs => {
      this.recommendedCars = recs;
    },
    error => console.error('Error fetching recommendations:', error)
  );
  
  // Subscribe to the car service to get the latest cars from the backend
  this.carService.getCars().subscribe(
    cars => {
      console.log('Cars received in car-list component:', cars);
      this.cars = cars;
      this.uniqueMakes = [...new Set(cars.map(c => c.make))];
      this.applyFilters(); // Apply filters whenever the car list changes
      
      // Check if there's a car ID in the query params
      this.route.queryParams.subscribe(params => {
        if (params['id']) {
          const carId = +params['id']; // Convert to number
          
          // For a specific car ID, fetch that car directly from the backend
          this.carService.getCarById(carId).subscribe(
            car => {
              if (car) {
                this.viewCarDetails(car);
              }
            },
            error => {
              console.error(`Error fetching car with ID ${carId}:`, error);
            }
          );
        }
      });
    },
    error => {
      console.error('Error fetching cars:', error);
    }
  );
}

  
  applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const matchesSearch = !this.searchQuery || 
                           car.make.toLowerCase().includes(this.searchQuery) || 
                           car.model.toLowerCase().includes(this.searchQuery);
      const matchesMake = this.selectedMake === 'all' || car.make === this.selectedMake;
      const matchesPrice = this.matchesPriceRange(car);
      
      return matchesSearch && matchesMake && matchesPrice;
    });
  }

  private matchesPriceRange(car: Car): boolean {
    if (this.selectedPriceRange === 'all') return true;
    if (this.selectedPriceRange === '0-2000') return car.price <= 2000;
    if (this.selectedPriceRange === '2000-5000') return car.price > 2000 && car.price <= 5000;
    if (this.selectedPriceRange === '5000+') return car.price > 5000;
    return true;
  }

  viewCarDetails(car: Car) {
    this.selectedCar = car;
    setTimeout(() => {
      const modalElement = document.getElementById('carDetailsModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  }

  isInWishlist(car: Car): boolean {
    return this.wishlist.some(item => item.id === car.id);
  }

  toggleWishlist(car: Car) {
    const index = this.wishlist.findIndex(item => item.id === car.id);
    if (index === -1) {
      this.wishlist.push(car);
    } else {
      this.wishlist.splice(index, 1);
    }
    localStorage.setItem('carWishlist', JSON.stringify(this.wishlist));
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.applyFilters();
  }

  filterByMake(event: any) {
    this.selectedMake = event.target.value || 'all';
    this.applyFilters();
  }

  filterByPrice(event: any) {
    this.selectedPriceRange = event.target.value || 'all';
    this.applyFilters();
  }

  resetFilters() {
    this.selectedMake = 'all';
    this.selectedPriceRange = 'all';
    this.searchQuery = '';
    this.applyFilters();
  }

  removeCar(car: Car) {
    if (confirm(`Are you sure you want to remove this ${car.make} ${car.model}?`)) {
      this.carService.removeCar(car.id).subscribe(() => {
        this.cars = this.cars.filter(c => c.id !== car.id);
        this.applyFilters();
        alert('Car removed successfully');
      });
    }
  }
}

