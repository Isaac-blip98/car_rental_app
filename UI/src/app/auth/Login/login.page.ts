import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [CommonModule, FormsModule],
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).then(user => {
      if (user.role === 'ADMIN') {
        this.router.navigate(['/dashboard']);
      } else if (user.role === 'AGENT') {
        this.router.navigate(['/agent/bookings']);
      } else {
        this.router.navigate(['/home']);
      }
    }).catch(err => {
      this.errorMessage = err.message || 'Invalid credentials';
    });
  }
  
  close() {
    this.router.navigate(['/home']);
  }
}
