import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType?: string;
  transmission?: string;
  color?: string;
  bodyType?: string;
  description: string;
  features?: string[];
  image?: string;
  contactPhone?: string;
  contactEmail?: string;
  availability: boolean;
  aiScore?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'https://car-buy-sell-2.onrender.com/api/cars';
  private carsSubject = new BehaviorSubject<Car[]>([]);

  constructor(private http: HttpClient) {
    this.loadCars();
  }

  private loadCars(): void {
    this.http.get<Car[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error loading cars from API:', error);
          return of([]);
        })
      )
      .subscribe(cars => {
        this.carsSubject.next(cars);
      });
  }

  getCars(): Observable<Car[]> {
    return this.carsSubject.asObservable();
  }

  refreshCars(): void {
    this.loadCars();
  }

  addCar(car: Partial<Car>): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car)
      .pipe(
        tap(newCar => {
          const currentCars = this.carsSubject.value;
          this.carsSubject.next([...currentCars, newCar]);
          console.log('Car added successfully:', newCar);
        }),
        catchError(error => {
          console.error('Error adding car:', error);
          throw error;
        })
      );
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting car with ID ${id}:`, error);
          throw error;
        })
      );
  }

  removeCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentCars = this.carsSubject.value;
          const updatedCars = currentCars.filter(car => car.id !== id);
          this.carsSubject.next(updatedCars);
          console.log(`Car with ID ${id} removed successfully`);
        }),
        catchError(error => {
          console.error(`Error removing car with ID ${id}:`, error);
          throw error;
        })
      );
  }

  updateCar(updatedCar: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${updatedCar.id}`, updatedCar)
      .pipe(
        tap(car => {
          const currentCars = this.carsSubject.value;
          const index = currentCars.findIndex(c => c.id === car.id);
          if (index !== -1) {
            const updatedCars = [...currentCars];
            updatedCars[index] = car;
            this.carsSubject.next(updatedCars);
          }
          console.log(`Car with ID ${car.id} updated successfully`);
        }),
        catchError(error => {
          console.error(`Error updating car with ID ${updatedCar.id}:`, error);
          throw error;
        })
      );
  }

  getCarsByMake(make: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/make/${make}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting cars with make ${make}:`, error);
          return of([]);
        })
      );
  }

  getCarsByPriceRange(range: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/price-range/${range}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting cars in price range ${range}:`, error);
          return of([]);
        })
      );
  }

  getRecommendedCars(userId: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/recommendations/${userId}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting recommended cars for user ${userId}:`, error);
          return of([]);
        })
      );
  }

  getCarsByBodyType(type: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/bodytype/${type}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting cars with body type ${type}:`, error);
          return of([]);
        })
      );
  }

  getCarsByBrand(brand: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/brand/${brand}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting cars with brand ${brand}:`, error);
          return of([]);
        })
      );
  }
}
