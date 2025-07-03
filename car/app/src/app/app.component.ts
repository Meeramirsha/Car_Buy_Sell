import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Car Marketplace';
  
  ngAfterViewInit() {
    // Initialize Bootstrap components after the view is initialized
    setTimeout(() => {
      try {
        // Initialize dropdowns
        const dropdownElementList = Array.from(document.querySelectorAll('.dropdown-toggle')) as HTMLElement[];
        dropdownElementList.forEach((dropdownToggleEl) => {
          if (dropdownToggleEl && !dropdownToggleEl.hasAttribute('data-bs-initialized')) {
            new bootstrap.Dropdown(dropdownToggleEl);
            dropdownToggleEl.setAttribute('data-bs-initialized', 'true');
          }
        });
            
        // Initialize carousels
        const carouselElementList = Array.from(document.querySelectorAll('.carousel')) as HTMLElement[];
        carouselElementList.forEach((carouselEl) => {
          if (carouselEl && !carouselEl.hasAttribute('data-bs-initialized')) {
            new bootstrap.Carousel(carouselEl, {
              interval: 5000
            });
            carouselEl.setAttribute('data-bs-initialized', 'true');
          }
        });
            
        // Initialize accordions
        const accordionElementList = Array.from(document.querySelectorAll('.accordion-button')) as HTMLElement[];
        accordionElementList.forEach((accordionEl) => {
          const target = accordionEl.getAttribute('data-bs-target');
          if (accordionEl && target && !accordionEl.hasAttribute('data-bs-initialized')) {
            new bootstrap.Collapse(target, {
              toggle: false
            });
            accordionEl.setAttribute('data-bs-initialized', 'true');
          }
        });
        
        // Initialize modals
        const modalElementList = Array.from(document.querySelectorAll('.modal')) as HTMLElement[];
        modalElementList.forEach((modalEl) => {
          if (modalEl && !modalEl.hasAttribute('data-bs-initialized')) {
            new bootstrap.Modal(modalEl);
            modalEl.setAttribute('data-bs-initialized', 'true');
          }
        });
      } catch (error) {
        console.error('Error initializing Bootstrap components:', error);
      }
    }, 100);
  }
}
