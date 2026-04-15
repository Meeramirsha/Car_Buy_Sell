import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellService, SellRequest } from '../services/sell.service';

@Component({
  selector: 'app-manage-sell-requests',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3 border-0">
        <h5 class="fw-bold mb-0">Sell Requests</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="bg-light">
              <tr>
                <th>Owner Name</th>
                <th>Phone</th>
                <th>Car Details</th>
                <th>Fuel</th>
                <th>Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let req of sellRequests">
                <td>{{ req.ownerName }}</td>
                <td>{{ req.phone }}</td>
                <td>
                  <div class="fw-bold">{{ req.brand }} {{ req.model }}</div>
                  <div class="small text-muted">Year: {{ req.year }}</div>
                </td>
                <td>{{ req.fuelType }}</td>
                <td class="fw-bold text-primary">₹{{ req.expectedPrice }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-success me-2">Call Owner</button>
                  <button class="btn btn-sm btn-outline-danger">Dismiss</button>
                </td>
              </tr>
              <tr *ngIf="sellRequests.length === 0">
                <td colspan="6" class="text-center py-4 text-muted">No sell requests found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table thead th { font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: #666; }
    .table td { vertical-align: middle; }
  `]
})
export class ManageSellRequestsComponent implements OnInit {
  sellRequests: SellRequest[] = [];

  constructor(private sellService: SellService) {}

  ngOnInit(): void {
    this.sellService.getAllSellRequests().subscribe(requests => {
      this.sellRequests = requests;
    });
  }
}
