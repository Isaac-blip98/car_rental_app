import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
      private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  async login(email: string, password: string): Promise<any> {
    const response = await lastValueFrom(
      this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
    );
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
    return response.user;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    localStorage.clear();
  }
}
