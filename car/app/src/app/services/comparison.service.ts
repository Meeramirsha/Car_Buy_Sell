import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private selectedCars = new BehaviorSubject<Car[]>([]);
  selectedCars$ = this.selectedCars.asObservable();

  getSelectedCars(): Car[] {
    return this.selectedCars.value;
  }

  constructor() {}

  toggleCarSelection(car: Car): boolean {
    const current = this.selectedCars.value;
    const exists = current.find(c => c.id === car.id);

    if (exists) {
      this.selectedCars.next(current.filter(c => c.id !== car.id));
      return false;
    } else {
      if (current.length >= 2) {
        // limit reached
        return false;
      }
      this.selectedCars.next([...current, car]);
      return true;
    }
  }

  isCarSelected(carId: number): boolean {
    return !!this.selectedCars.value.find(c => c.id === carId);
  }

  getSelectionCount(): number {
    return this.selectedCars.value.length;
  }

  clearSelection() {
    this.selectedCars.next([]);
  }
}
