import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:8081/api/recommendations';

  constructor(private http: HttpClient) { }

  getRecommendations(budget?: number, familySize?: number, fuelPreference?: string): Observable<Car[]> {
    let params = new HttpParams();
    if (budget) params = params.set('budget', budget.toString());
    if (familySize) params = params.set('familySize', familySize.toString());
    if (fuelPreference) params = params.set('fuelPreference', fuelPreference);

    return this.http.get<Car[]>(this.apiUrl, { params });
  }
}
