import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public credentials: {
    email?: string;
    password?: string;
  } = {
    email: '',
    password: ''
  };
  public get loginData(): { email?: string; password?: string } { return this.credentials; }
  public error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.error = typeof err.error === 'string' ? err.error : (err.error?.message || 'Invalid email or password.');
      }
    });
  }
}
