import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { Observable } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Smart Car Rental & Booking';
  isLoggedIn$!: Observable<boolean>;
  showBackToTop: boolean = false;

  constructor(public authService: AuthService) {
    if (typeof localStorage !== 'undefined') {
      // Version 2 reset to handle the recent backend security update
      if (localStorage.getItem('token') && !localStorage.getItem('hard_reset_v2')) {
        console.warn('Security update detected. Clearing stale tokens...');
        localStorage.clear();
        localStorage.setItem('hard_reset_v2', 'true');
        window.location.href = '/#/login';
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
  }
  
  ngAfterViewInit() {
    // Initialize Bootstrap components
    setTimeout(() => {
      try {
        const dropdownElementList = Array.from(document.querySelectorAll('.dropdown-toggle')) as HTMLElement[];
        dropdownElementList.forEach((dropdownToggleEl) => {
          if (dropdownToggleEl && !dropdownToggleEl.hasAttribute('data-bs-initialized')) {
            new bootstrap.Dropdown(dropdownToggleEl);
            dropdownToggleEl.setAttribute('data-bs-initialized', 'true');
          }
        });
      } catch (error) {
        console.error('Error initializing Bootstrap components:', error);
      }
    }, 100);
  }
}
