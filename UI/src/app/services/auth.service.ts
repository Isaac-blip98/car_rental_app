import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { BehaviorSubject, lastValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  private currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getStoredUser(): any | null {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

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

    this.currentUserSubject.next(response.user);
    return response.user;
  }

  getCurrentUser(): any | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null); 
  }
}
