import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarService, Car } from '../services/car.service';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-light-soft min-vh-100 py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-dark">Car <span class="text-primary">Comparison</span></h2>
          <p class="lead text-muted">Side-by-side spec comparison to help you choose the better ride.</p>
        </div>

        <div class="row g-4" *ngIf="car1 && car2; else loading">
          <div class="col-12">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div class="table-responsive">
                <table class="table table-borderless align-middle mb-0">
                  <thead class="bg-light">
                    <tr>
                      <th style="width: 200px;">Features</th>
                      <th class="text-center">
                        <img [src]="car1.image" class="img-fluid rounded-3 mb-2" style="height: 150px; object-fit: cover;">
                        <h5 class="fw-bold mb-0">{{ car1.make }} {{ car1.model }}</h5>
                      </th>
                      <th class="text-center border-start">
                        <img [src]="car2.image" class="img-fluid rounded-3 mb-2" style="height: 150px; object-fit: cover;">
                        <h5 class="fw-bold mb-0">{{ car2.make }} {{ car2.model }}</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-bottom">
                      <td class="fw-bold text-muted ps-4">Price</td>
                      <td class="text-center h5 fw-bold text-primary">₹{{ car1.price }}</td>
                      <td class="text-center h5 fw-bold text-primary border-start">₹{{ car2.price }}</td>
                    </tr>
                    <tr class="border-bottom bg-light-soft">
                      <td class="fw-bold text-muted ps-4">Body Type</td>
                      <td class="text-center">{{ car1.bodyType }}</td>
                      <td class="text-center border-start">{{ car2.bodyType }}</td>
                    </tr>
                    <tr class="border-bottom">
                      <td class="fw-bold text-muted ps-4">Fuel Type</td>
                      <td class="text-center">{{ car1.fuelType }}</td>
                      <td class="text-center border-start">{{ car2.fuelType }}</td>
                    </tr>
                    <tr class="border-bottom bg-light-soft">
                      <td class="fw-bold text-muted ps-4">Mileage</td>
                      <td class="text-center">{{ car1.mileage }} km</td>
                      <td class="text-center border-start">{{ car2.mileage }} km</td>
                    </tr>
                    <tr class="border-bottom">
                      <td class="fw-bold text-muted ps-4">Year</td>
                      <td class="text-center">{{ car1.year }}</td>
                      <td class="text-center border-start">{{ car2.year }}</td>
                    </tr>
                    <tr class="border-bottom bg-light-soft">
                      <td class="fw-bold text-muted ps-4">Transmission</td>
                      <td class="text-center">{{ car1.transmission || 'Manual' }}</td>
                      <td class="text-center border-start">{{ car2.transmission || 'Manual' }}</td>
                    </tr>
                    <tr class="border-bottom">
                        <td class="fw-bold text-muted ps-4">Actions</td>
                        <td class="text-center pt-3 pb-3">
                            <a [routerLink]="['/booking', car1.id]" class="btn btn-primary rounded-pill px-4">Book {{ car1.make }}</a>
                        </td>
                        <td class="text-center pt-3 pb-3 border-start">
                            <a [routerLink]="['/booking', car2.id]" class="btn btn-primary rounded-pill px-4">Book {{ car2.make }}</a>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <ng-template #loading>
          <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="text-muted mt-3">Fetching car details for comparison...</p>
          </div>
        </ng-template>

        <div class="text-center mt-5">
            <a routerLink="/buy" class="btn btn-link link-secondary text-decoration-none">
                <i class="bi bi-arrow-left me-2"></i> Back to car listings
            </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bg-light-soft { background-color: #f8faff; }
    .table th { padding: 2rem 1rem; }
    .table td { padding: 1.5rem 1rem; }
  `]
})
export class ComparisonComponent implements OnInit {
  car1: Car | null = null;
  car2: Car | null = null;

  constructor(private route: ActivatedRoute, private carService: CarService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id1 = params['car1'];
      const id2 = params['car2'];

      if (id1) {
        this.carService.getCarById(id1).subscribe(car => this.car1 = car);
      }
      if (id2) {
        this.carService.getCarById(id2).subscribe(car => this.car2 = car);
      }
    });
  }
}
