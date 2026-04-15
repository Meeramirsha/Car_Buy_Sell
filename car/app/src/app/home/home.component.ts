import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService, Car } from '../services/car.service';
import { SellService, SellRequest } from '../services/sell.service';
import { WishlistService } from '../services/wishlist.service';
import { ComparisonService } from '../services/comparison.service';
import { RecommendationService } from '../services/recommendation.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.page.css'],
  imports: [RouterLink, CommonModule, FormsModule],
})
export class HomeComponent implements OnInit {
  featuredCars: Car[] = [];
  filteredHeroCars: Car[] = [];
  filterTitle: string = '';
  showFilteredResults: boolean = false;
  recommendedCars: any[] = [];
  wishlistIds: Set<number> = new Set();
  comparisonCount: number = 0;
  
  userPreferences = {
    budget: 0,
    familySize: 1,
    fuel: ''
  };
  showPrefModal: boolean = false;
  
  searchQuery = {
    make: '',
    bodyType: '',
    budget: ''
  };
  
  activeTab: 'buy' | 'sell' = 'buy';
  
  sellRequest: SellRequest = {
    ownerName: '',
    phone: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    fuelType: 'Petrol',
    expectedPrice: 0
  };
  
  sellSuccess: boolean = false;
  sellError: string = '';

  bodyTypes = [
    { name: 'Hatchback', icon: 'bi-car-front', image: 'https://images.unsplash.com/photo-1590362891175-379a089d784a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Sedan', icon: 'bi-car-front-fill', image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80' },
    { name: 'SUV', icon: 'bi-truck', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80' },
    { name: 'MUV', icon: 'bi-bus-front', image: 'https://images.unsplash.com/photo-1621932953986-15fcf084da0f?auto=format&fit=crop&w=600&q=80' },
    { name: 'Luxury SUV', icon: 'bi-gem', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80' }
  ];

  popularBrands = [
    { name: 'Hyundai', cars: 12, logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200&h=200&fit=crop' },
    { name: 'Maruti Suzuki', cars: 15, logo: 'https://images.unsplash.com/photo-1583121274602-3e2820c69d88?w=200&h=200&fit=crop' },
    { name: 'Kia', cars: 8, logo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&h=200&fit=crop' },
    { name: 'Honda', cars: 10, logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=200&fit=crop' },
    { name: 'Tata', cars: 14, logo: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&h=200&fit=crop' },
    { name: 'Mahindra', cars: 9, logo: 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?w=200&h=200&fit=crop' },
    { name: 'Renault', cars: 6, logo: 'https://images.unsplash.com/photo-1603584173870-7f16df367c25?w=200&h=200&fit=crop' },
    { name: 'Volkswagen', cars: 7, logo: 'https://images.unsplash.com/photo-1617469767053-d3b508a042a5?w=200&h=200&fit=crop' }
  ];
  
  constructor(
    private carService: CarService, 
    private sellService: SellService,
    private wishlistService: WishlistService,
    private comparisonService: ComparisonService,
    private recommendationService: RecommendationService,
    private router: Router,
    public authService: AuthService
  ) {}
  
  getSafeImageUrl(url: any): string {
    if (!url || url === 'undefined' || url === 'null') {
      return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
    }
    return url;
  }
  
  onImageError(event: any): void {
    // Silencing warning to keep console clean, but still applying fallback
    event.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
    event.target.classList.add('image-fallback');
  }
  
  // Navigation method
  navigateTo(route: string, queryParams?: any): void {
    console.log(`Attempting to navigate to: ${route}`, queryParams ? `with params: ${JSON.stringify(queryParams)}` : '');
    
    // Direct hash-based navigation
    try {
      let url = route.startsWith('/') ? `#${route}` : `#/${route}`;
      
      // Add query params if provided
      if (queryParams) {
        const params = new URLSearchParams();
        for (const key in queryParams) {
          params.set(key, queryParams[key]);
        }
        url += `?${params.toString()}`;
      }
      
      window.location.href = url;
      console.log(`Navigation to ${url} completed`);
    } catch (error) {
      console.error(`Navigation error for route ${route}:`, error);
    }
  }
  
  // Method to scroll to a section
  scrollToSection(sectionId: string): void {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    // Add a small delay to ensure the DOM is fully loaded
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      console.log(`Element found:`, element);
      
      if (element) {
        // Try to scroll to the element
        try {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log('Scrolled to element');
        } catch (error) {
          console.error('Error scrolling to element:', error);
          
          // Fallback to manual scrolling
          try {
            const yOffset = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
            console.log('Used fallback scrolling');
          } catch (fallbackError) {
            console.error('Fallback scrolling failed:', fallbackError);
          }
        }
      } else {
        console.error(`Element with ID '${sectionId}' not found`);
      }
    }, 100);
  }

  // Direct navigation methods for problematic links
  goToFinancing(): void {
    console.log('Navigating to financing page using direct window.location');
    // Use our custom navigation method for hash-based routing
    this.navigateTo('financing');
  }
  
  scrollToElement(elementId: string): void {
    console.log(`Attempting to scroll to element: ${elementId}`);
    
    // Simple direct approach
    try {
      const element = document.getElementById(elementId);
      if (element) {
        console.log(`Element found, scrolling to ${elementId}`);
        
        // Force layout recalculation
        window.scrollTo(0, window.scrollY + 1);
        
        // Use a very short timeout to ensure the DOM is ready
        setTimeout(() => {
          // Get the element's position
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 100; // 100px offset for header
          
          console.log(`Scrolling to position: ${targetPosition}`);
          
          // Scroll to the element
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 10);
      } else {
        console.error(`Element with ID '${elementId}' not found`);
        
        // Fallback: try to find by class if ID fails
        if (elementId === 'reviews') {
          const reviewsSection = document.querySelector('.testimonials-bg');
          if (reviewsSection) {
            console.log('Found reviews section by class, scrolling');
            reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            // Last resort: scroll to an approximate position
            window.scrollTo({ top: 1500, behavior: 'smooth' });
          }
        }
      }
    } catch (error) {
      console.error(`Error scrolling to ${elementId}:`, error);
      // Fallback to a simple scroll
      window.scrollTo({ top: 1500, behavior: 'smooth' });
    }
  }


  // New Filtering Methods
  filterByBodyType(type: string): void {
    this.filterTitle = `Results for ${type}`;
    this.showFilteredResults = true;
    this.carService.getCarsByBodyType(type).subscribe(cars => {
      this.filteredHeroCars = cars;
      this.scrollToElement('filtered-results');
    });
  }

  filterByBrand(brand: string): void {
    this.filterTitle = `Results for ${brand}`;
    this.showFilteredResults = true;
    this.carService.getCarsByBrand(brand).subscribe(cars => {
      this.filteredHeroCars = cars;
      this.scrollToElement('filtered-results');
    });
  }

  // Wishlist Methods
  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (cars) => {
        this.wishlistIds = new Set(cars.map(c => c.id));
      },
      error: (err) => console.error('Error loading wishlist:', err)
    });
  }

  isWishlisted(carId: number): boolean {
    return this.wishlistIds.has(carId);
  }

  toggleWishlist(car: any): void {
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

  // Comparison Methods
  toggleComparison(car: Car): void {
    this.comparisonService.toggleCarSelection(car);
    this.updateComparisonCount();
  }

  isCarSelected(carId: number): boolean {
    return this.comparisonService.isCarSelected(carId);
  }

  updateComparisonCount(): void {
    this.comparisonCount = this.comparisonService.getSelectionCount();
  }

  goToComparison(): void {
    const selected = (this.comparisonService as any).selectedCars.value;
    if (selected.length === 2) {
      this.router.navigate(['/compare'], { 
        queryParams: { car1: selected[0].id, car2: selected[1].id } 
      });
    }
  }

  // Recommendation Methods
  togglePrefModal() {
    this.showPrefModal = !this.showPrefModal;
  }

  applyRecommendations() {
    this.recommendationService.getRecommendations(
      this.userPreferences.budget || undefined,
      this.userPreferences.familySize || undefined,
      this.userPreferences.fuel || undefined
    ).subscribe(cars => {
      this.recommendedCars = cars.map(car => ({
        ...car,
        aiScore: Math.floor(Math.random() * 10) + 90
      }));
      this.showPrefModal = false;
      this.scrollToElement('ai-recommendations');
    });
  }

  setTab(tab: 'buy' | 'sell'): void {
    this.activeTab = tab;
  }

  onSearch(): void {
    console.log('Searching with:', this.searchQuery);
    if (!this.searchQuery.make && !this.searchQuery.bodyType && !this.searchQuery.budget) {
      return;
    }
    
    this.filterTitle = `Search Results`;
    this.showFilteredResults = true;
    
    this.carService.getCars().subscribe(cars => {
      this.filteredHeroCars = cars.filter(car => {
        const matchMake = !this.searchQuery.make || car.make.toLowerCase().includes(this.searchQuery.make.toLowerCase());
        const matchBody = !this.searchQuery.bodyType || car.bodyType?.toLowerCase() === this.searchQuery.bodyType.toLowerCase();
        let matchBudget = true;
        if (this.searchQuery.budget) {
            const maxPrice = parseInt(this.searchQuery.budget);
            matchBudget = car.price <= maxPrice;
        }
        return matchMake && matchBody && matchBudget;
      });
      this.scrollToElement('filtered-results');
    });
  }

  submitSellCar(): void {
    this.sellService.submitSellRequest(this.sellRequest).subscribe({
      next: (res) => {
        this.sellSuccess = true;
        this.sellError = '';
        this.resetSellForm();
      },
      error: (err) => {
        this.sellError = 'Something went wrong. Please try again.';
        this.sellSuccess = false;
      }
    });
  }

  resetSellForm(): void {
    this.sellRequest = {
      ownerName: '',
      phone: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      mileage: 0,
      fuelType: 'Petrol',
      expectedPrice: 0
    };
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadWishlist();
    }
    this.updateComparisonCount();
    this.applyRecommendations(); // Load initial recommendations
    // Get cars from the service and select 3 random ones as featured
    this.carService.getCars().subscribe(cars => {
      // Shuffle the array and take the first 4 cars with realistic images
      const shuffled = [...cars].map(car => ({
        ...car,
        image: car.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
      })).sort(() => 0.5 - Math.random());
      this.featuredCars = shuffled.slice(0, 4);
      
      // Select 3 random different cars for AI recommendations
      this.recommendedCars = shuffled.slice(4, 7).map(car => ({
        ...car,
        aiScore: Math.floor(Math.random() * 15) + 85 // Mock Match Score 85-99%
      }));
    });
    
    // Handle fragment for scrolling to sections
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // Remove '#' and '/' to get pure section ID (e.g. from '#/faq-section' to 'faq-section')
      const fragment = hash.replace(/^[#/]+/, ''); 
      if (fragment && fragment !== '') {
        this.scrollToSection(fragment);
      }
    }
  }
}
