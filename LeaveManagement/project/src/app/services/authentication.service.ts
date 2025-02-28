import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8092/api/users/login'; // ✅ Ensure this matches backend

  constructor(private http: HttpClient) {}

  login(user: { pinNumber: string; password: string }): Observable<boolean> {
    return this.http.post<User>(this.apiUrl, user, { responseType: 'json' as 'json' }).pipe(
      map((response: any) => {  // Use `any` temporarily to debug
        console.log('Backend Raw Response:', response);
  
        if (response && response.role) {
          localStorage.setItem('user', JSON.stringify(response));
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }
  

  logout(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
