import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('email', res.email);
        this.loggedInSubject.next(true);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }, { responseType: 'text' });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.loggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
