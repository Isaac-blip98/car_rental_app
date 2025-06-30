import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  imports: [CommonModule, FormsModule],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  phone = '';
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    const payload: any = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    if (this.phone.trim()) {
      payload.phone = this.phone.trim();
    }

    this.http.post(`${environment.apiBaseUrl}/auth/register`, payload).subscribe({
      next: () => {
        this.successMessage = '🎉 Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed';
      },
    });
  }

  close() {
    this.router.navigate(['/home']);
  }
}
