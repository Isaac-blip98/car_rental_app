import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../shared/services/auth-modal,service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginModalComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    public modalService: ModalService
  ) {}

  login() {
    this.auth
      .login(this.email, this.password)
      .then((user) => {
        this.modalService.closeLogin();
        setTimeout(() => {
          if (user.role === 'ADMIN') this.router.navigate(['/dashboard']);
          else if (user.role === 'AGENT')
            this.router.navigate(['/agent/bookings']);
          else this.router.navigate(['/home']);
        }, 0);
      })
      .catch((err) => {
        this.errorMessage = err.message || 'Invalid credentials';
      });
  }

  close() {
    this.modalService.closeLogin();
  }
}
