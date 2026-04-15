import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = typeof err.error === 'string' ? err.error : 'Failed to process request.';
        this.loading = false;
      }
    });
  }
}
