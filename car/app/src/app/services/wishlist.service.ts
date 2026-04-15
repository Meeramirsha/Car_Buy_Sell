import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8081/api/wishlist';

  constructor(private http: HttpClient) { }

  getWishlist(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  addToWishlist(carId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${carId}`, {}, { responseType: 'text' });
  }

  removeFromWishlist(carId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${carId}`, { responseType: 'text' });
  }
}
