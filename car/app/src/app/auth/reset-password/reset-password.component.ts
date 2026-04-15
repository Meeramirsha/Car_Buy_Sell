import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  message: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.error = 'Invalid token. Please request a new link.';
    }
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.message = '';
    this.error = '';

    const resetData = {
      token: this.token,
      newPassword: this.newPassword
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (res) => {
        this.message = 'Password has been reset successfully! You can now log in.';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        this.error = typeof err.error === 'string' ? err.error : 'Failed to reset password.';
        this.loading = false;
      }
    });
  }
}
