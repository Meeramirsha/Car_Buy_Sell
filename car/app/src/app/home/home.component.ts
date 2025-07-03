import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarService, Car } from '../services/car.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.page.css'],
  imports: [RouterLink, CommonModule],
})
export class HomeComponent implements OnInit {
  featuredCars: Car[] = [];
  
  constructor(private carService: CarService, private router: Router) {}
  
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



  ngOnInit() {
    // Get cars from the service and select 3 random ones as featured
    this.carService.getCars().subscribe(cars => {
      // Shuffle the array and take the first 3 cars
      const shuffled = [...cars].sort(() => 0.5 - Math.random());
      this.featuredCars = shuffled.slice(0, 3);
    });
    
    // Handle fragment for scrolling to sections
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const fragment = hash.substring(1); // Remove the # character
      // Only scroll if fragment is not the root path
      if (fragment && fragment !== '/' && fragment !== '' && fragment !== '') {
        this.scrollToSection(fragment);
      }
    }
  }
}
