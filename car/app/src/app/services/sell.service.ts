import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SellRequest {
  id?: number;
  ownerName: string;
  phone: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  expectedPrice: number;
  predictedPrice?: number;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SellService {
  private apiUrl = 'https://car-buy-sell-2.onrender.com/api/sellcar';

  constructor(private http: HttpClient) { }

  submitSellRequest(request: SellRequest): Observable<SellRequest> {
    return this.http.post<SellRequest>(this.apiUrl, request);
  }

  getAllSellRequests(): Observable<SellRequest[]> {
    return this.http.get<SellRequest[]>(this.apiUrl);
  }

  predictPrice(details: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/predict`, details);
  }
}
