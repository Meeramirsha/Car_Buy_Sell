import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  description: string;
  features?: string[];
  image?: string;
  contactPhone?: string;
  contactEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private initialCars: Car[] = [
    { 
      id: 1,
      make: 'Toyota', 
      model: 'Corolla', 
      year: 2022,
      price: 20000,
      mileage: 15000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      color: 'Silver',
      description: 'This Toyota Corolla is in excellent condition with low mileage. It features a fuel-efficient engine and comes with a comprehensive warranty package.',
      features: ['Bluetooth Connectivity', 'Backup Camera', 'Lane Departure Warning', 'Adaptive Cruise Control', 'Apple CarPlay'],
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      contactPhone: '(555) 123-4567',
      contactEmail: 'seller1@example.com'
    },
    { 
      id: 2,
      make: 'Honda', 
      model: 'Civic', 
      year: 2021,
      price: 22000,
      mileage: 18500,
      fuelType: 'Gasoline',
      transmission: 'CVT',
      color: 'Blue',
      description: 'This Honda Civic offers excellent fuel economy and a comfortable ride. It comes with Honda Sensing safety features and a spacious interior.',
      features: ['Honda Sensing Suite', 'Touchscreen Infotainment', 'Android Auto', 'Heated Seats', 'Sunroof'],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      contactPhone: '(555) 234-5678',
      contactEmail: 'seller2@example.com'
    },
    { 
      id: 3,
      make: 'Ford', 
      model: 'Focus', 
      year: 2020,
      price: 18000,
      mileage: 25000,
      fuelType: 'Gasoline',
      transmission: 'Manual',
      color: 'Red',
      description: 'This Ford Focus offers a sporty driving experience with responsive handling. It has been well-maintained and includes several premium features.',
      features: ['SYNC 3 Infotainment', 'Keyless Entry', 'Alloy Wheels', 'Parking Sensors', 'Climate Control'],
      image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      contactPhone: '(555) 345-6789',
      contactEmail: 'seller3@example.com'
    },
    {
      id: 4,
      make: 'Nissan',
      model: 'Altima',
      year: 2022,
      price: 24500,
      mileage: 12000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      color: 'White',
      description: 'This Nissan Altima features a powerful engine and comfortable interior. It comes with Nissan\'s advanced safety technologies and excellent fuel economy.',
      features: ['ProPILOT Assist', 'Bose Premium Audio', 'Leather Seats', 'Remote Start', 'Blind Spot Warning'],
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      contactPhone: '(555) 456-7890',
      contactEmail: 'seller4@example.com'
    },
    {
      id: 5,
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2021,
      price: 21000,
      mileage: 19000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      color: 'Black',
      description: 'This Chevrolet Malibu offers a smooth ride with excellent fuel efficiency. It includes a comprehensive infotainment system and spacious cabin.',
      features: ['Chevrolet Infotainment 3', 'Wi-Fi Hotspot', 'Teen Driver Technology', 'Rear Vision Camera', 'Automatic Emergency Braking'],
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      contactPhone: '(555) 567-8901',
      contactEmail: 'seller5@example.com'
    },
    {
      id: 6,
      make: 'Hyundai',
      model: 'Sonata',
      year: 2022,
      price: 23500,
      mileage: 10000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      color: 'Silver',
      description: 'This Hyundai Sonata Hybrid combines excellent fuel economy with modern styling. It features Hyundai\'s latest technology and safety features.',
      features: ['Digital Key', 'Panoramic Sunroof', 'Ventilated Seats', 'Highway Driving Assist', 'Surround View Monitor'],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      contactPhone: '(555) 678-9012',
      contactEmail: 'seller6@example.com'
    }
  ];

  private carsSubject = new BehaviorSubject<Car[]>(this.loadCars());
  private nextId = this.calculateNextId();

  constructor() { }

  private loadCars(): Car[] {
    const savedCars = localStorage.getItem('carList');
    if (savedCars) {
      return JSON.parse(savedCars);
    } else {
      // Initialize with default cars
      localStorage.setItem('carList', JSON.stringify(this.initialCars));
      return this.initialCars;
    }
  }

  private calculateNextId(): number {
    const cars = this.carsSubject.value;
    return cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;
  }

  getCars(): Observable<Car[]> {
    return this.carsSubject.asObservable();
  }

  addCar(car: Partial<Car>): void {
    const cars = this.carsSubject.value;
    
    // Create a new car with a unique ID
    const newCar: Car = {
      id: this.nextId++,
      make: car.make || '',
      model: car.model || '',
      year: car.year || new Date().getFullYear(),
      price: car.price || 0,
      mileage: car.mileage || 0,
      description: car.description || '',
      fuelType: car.fuelType || 'Gasoline',
      transmission: car.transmission || 'Automatic',
      color: car.color || '',
      contactPhone: car.contactPhone || '',
      contactEmail: car.contactEmail || '',
      // Set default image if none provided
      image: car.image || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      features: car.features || []
    };
    
    // Add the new car to the list
    const updatedCars = [...cars, newCar];
    
    // Update the subject and localStorage
    this.carsSubject.next(updatedCars);
    localStorage.setItem('carList', JSON.stringify(updatedCars));
    
    console.log('Car added successfully:', newCar);
    console.log('Updated car list:', updatedCars);
  }

  getCarById(id: number): Car | undefined {
    return this.carsSubject.value.find(car => car.id === id);
  }
}