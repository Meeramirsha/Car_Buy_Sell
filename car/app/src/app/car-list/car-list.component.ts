import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarService, Car } from '../services/car.service';
declare var bootstrap: any;

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  
  ngOnInit() {
  // Load wishlist from localStorage if available
  const savedWishlist = localStorage.getItem('carWishlist');
  if (savedWishlist) {
    this.wishlist = JSON.parse(savedWishlist);
    console.log('Wishlist loaded from localStorage:', this.wishlist);
  }
  
  // Subscribe to the car service to get the latest cars from the backend
  this.carService.getCars().subscribe(
    cars => {
      console.log('Cars received in car-list component:', cars);
      this.cars = cars;
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
  // If both make and price range filters are set to 'all', get all cars
  if (this.selectedMake === 'all' && this.selectedPriceRange === 'all') {
    this.filteredCars = this.cars;
    return;
  }
  
  // If only make filter is set
  if (this.selectedMake !== 'all' && this.selectedPriceRange === 'all') {
    this.carService.getCarsByMake(this.selectedMake).subscribe(
      cars => {
        this.filteredCars = cars;
      },
      error => {
        console.error(`Error fetching cars by make ${this.selectedMake}:`, error);
        // Fallback to client-side filtering if API call fails
        this.filteredCars = this.cars.filter(car => car.make === this.selectedMake);
      }
    );
    return;
  }
  
  // If only price range filter is set
  if (this.selectedMake === 'all' && this.selectedPriceRange !== 'all') {
    this.carService.getCarsByPriceRange(this.selectedPriceRange).subscribe(
      cars => {
        this.filteredCars = cars;
      },
      error => {
        console.error(`Error fetching cars by price range ${this.selectedPriceRange}:`, error);
        // Fallback to client-side filtering if API call fails
        this.filteredCars = this.filterByPriceRange(this.cars);
      }
    );
    return;
  }
  
  // If both filters are set, we'll need to apply them both
  // First filter by make, then by price range
  this.carService.getCarsByMake(this.selectedMake).subscribe(
    carsByMake => {
      // Now filter these cars by price range
      this.carService.getCarsByPriceRange(this.selectedPriceRange).subscribe(
        carsByPrice => {
          // Find cars that match both filters (intersection)
          const makeIds = new Set(carsByMake.map(car => car.id));
          this.filteredCars = carsByPrice.filter(car => makeIds.has(car.id));
        },
        error => {
          console.error(`Error fetching cars by price range ${this.selectedPriceRange}:`, error);
          // Fallback to client-side filtering if API call fails
          this.filteredCars = this.filterByPriceRange(carsByMake);
        }
      );
    },
    error => {
      console.error(`Error fetching cars by make ${this.selectedMake}:`, error);
      // Fallback to client-side filtering if API call fails
      this.filteredCars = this.cars.filter(car => 
        car.make === this.selectedMake && this.matchesPriceRange(car)
      );
    }
  );
}

// Helper method for client-side price filtering
private filterByPriceRange(cars: Car[]): Car[] {
  return cars.filter(car => this.matchesPriceRange(car));
}

// Helper method to check if a car matches the selected price range
private matchesPriceRange(car: Car): boolean {
  switch (this.selectedPriceRange) {
    case 'under15k':
      return car.price < 15000;
    case '15k-25k':
      return car.price >= 15000 && car.price <= 25000;
    case 'over25k':
      return car.price > 25000;
    default:
      return true; // 'all' or any other value
  }
}

  
  viewCarDetails(car: Car) {
    this.selectedCar = car;
    
    // Use setTimeout to ensure the DOM is updated before showing the modal
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
  
  contactSeller(car: Car) {
    this.selectedCar = car;
    
    // Use setTimeout to ensure the DOM is updated before showing the modal
    setTimeout(() => {
      const modalElement = document.getElementById('contactSellerModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  }

  // Edit car method
  editCar(car: Car) {
    console.log(`Editing car with ID: ${car.id}`);
    // Navigate to edit page with car ID
    // For now, we'll just show an alert
    alert(`Editing car: ${car.make} ${car.model}`);
    // In a real application, you would navigate to an edit form
    // this.router.navigate(['/edit-car'], { queryParams: { id: car.id } });
  }

  // Remove car method
  removeCar(car: Car) {
  console.log(`Attempting to remove car:`, car);
  
  // Confirm before removing
  if (confirm(`Are you sure you want to remove this ${car.make} ${car.model}?`)) {
    try {
      console.log(`Confirmation accepted, removing car with ID: ${car.id}`);
      
      // Call the service to remove the car from the backend
      this.carService.removeCar(car.id).subscribe(
        () => {
          console.log(`Car with ID ${car.id} removed successfully`);
          
          // Update local arrays for UI
          this.cars = this.cars.filter(c => c.id !== car.id);
          this.filteredCars = this.filteredCars.filter(c => c.id !== car.id);
          
          // Show success message
          alert(`${car.make} ${car.model} removed successfully`);
        },
        error => {
          console.error('Error removing car:', error);
          alert('Failed to remove car. Please try again.');
        }
      );
    } catch (error) {
      console.error('Error removing car:', error);
      alert('Failed to remove car. Please try again.');
    }
  } else {
    console.log('User cancelled car removal');
  }
}
  toggleWishlist(car: Car) {
    const index = this.wishlist.findIndex(item => item.id === car.id);
    
    if (index === -1) {
      // Add to wishlist
      this.wishlist.push(car);
    } else {
      // Remove from wishlist
      this.wishlist.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('carWishlist', JSON.stringify(this.wishlist));
  }
}

