import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from '../../shared/services/auth-modal,service';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  imports: [CommonModule, FormsModule],
})
export class RegisterModalComponent {
  name = '';
  email = '';
  password = '';
  phone = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public modalService: ModalService
  ) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    const payload: any = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    if (this.phone.trim()) payload.phone = this.phone.trim();

    this.http
      .post(`${environment.apiBaseUrl}/auth/register`, payload)
      .subscribe({
        next: () => {
          this.successMessage = '🎉 Registration successful! Redirecting...';
          setTimeout(() => {
            this.modalService.closeRegister();
            this.modalService.openLogin();
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed';
        },
      });
  }

  close() {
    this.modalService.closeRegister();
  }
}
