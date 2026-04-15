import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  } = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  public error: string = '';
  public success: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onRegister(): void {
    this.error = '';
    this.success = '';
    
    // Convert current structure to what service expects or update service
    const registerData = {
      name: `${this.user.firstName} ${this.user.lastName}`.trim(),
      email: this.user.email,
      password: this.user.password
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        // Extract the error message from the backend response
        this.error = typeof err.error === 'string' ? err.error : (err.error?.message || 'Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
    });
  }
}
