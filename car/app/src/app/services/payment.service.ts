import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateOrderRequest {
  bookingId: number;
  amount: number;
}

export interface VerifyPaymentRequest {
  bookingId: number;
  rzpPaymentId: string;
  rzpOrderId: string;
  rzpSignature: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://car-buy-sell-2.onrender.com/api/payments';

  constructor(private http: HttpClient) { }

  createOrder(request: CreateOrderRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-order`, request);
  }

  verifyPayment(request: VerifyPaymentRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify`, request);
  }
}
