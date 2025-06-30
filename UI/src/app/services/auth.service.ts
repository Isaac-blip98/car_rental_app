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
      this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
    );

    if (!response.accessToken) {
      throw new Error('Login response is missing accessToken');
    }

    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response.user;
  }
  getCurrentUser(): any | null {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.clear();
  }
}
