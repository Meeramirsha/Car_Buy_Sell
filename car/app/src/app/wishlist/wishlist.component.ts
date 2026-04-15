import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { Car } from '../services/car.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-light-soft min-vh-100 py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-dark">My <span class="text-primary">Wishlist</span></h2>
          <p class="lead text-muted">Your curated collection of premium vehicles you're watching.</p>
        </div>

        <div class="row g-4" *ngIf="wishlistCars.length > 0; else emptyWishlist">
          <div class="col-md-6 col-lg-4" *ngFor="let car of wishlistCars">
            <div class="car-card h-100 bg-white shadow-sm border-0 position-relative rounded-4 overflow-hidden">
              <button (click)="removeFromWishlist(car.id)" class="btn btn-link position-absolute top-0 end-0 m-2 text-danger" title="Remove from wishlist">
                <i class="bi bi-trash-fill fs-5"></i>
              </button>
              
              <div class="position-relative">
                <img [src]="car.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'" class="img-fluid w-100 car-img-top" [alt]="car.model" style="height: 200px; object-fit: cover;">
                <span class="badge bg-primary position-absolute bottom-0 start-0 m-3">{{ car.year }}</span>
              </div>

              <div class="card-body p-4">
                <h5 class="fw-bold mb-1">{{ car.make }} {{ car.model }}</h5>
                <p class="text-muted small mb-3">{{ car.fuelType }} • {{ car.transmission }}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                  <div class="h5 mb-0 fw-bold text-primary">₹{{ car.price }}</div>
                  <a [routerLink]="['/booking', car.id]" class="btn btn-primary rounded-pill px-4">Book Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ng-template #emptyWishlist>
          <div class="card border-0 shadow-sm rounded-4 p-5 text-center">
            <i class="bi bi-heart text-muted opacity-25 mb-4" style="font-size: 5rem;"></i>
            <h4 class="fw-bold">Your wishlist is empty</h4>
            <p class="text-muted">You haven't saved any cars yet. Start exploring our premium collection.</p>
            <a routerLink="/buy" class="btn btn-primary rounded-pill px-5 py-2 mt-3">Browse Cars</a>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .car-card { transition: transform 0.3s ease; }
    .car-card:hover { transform: translateY(-5px); }
    .bg-light-soft { background-color: #f8faff; }
  `]
})
export class WishlistComponent implements OnInit {
  wishlistCars: Car[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe({
      next: (cars) => this.wishlistCars = cars,
      error: (err) => console.error('Error fetching wishlist:', err)
    });
  }

  removeFromWishlist(carId: number) {
    this.wishlistService.removeFromWishlist(carId).subscribe(() => {
      this.wishlistCars = this.wishlistCars.filter(c => c.id !== carId);
    });
  }
}
