import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginModalComponent } from './auth/Login/login-modal.component';
import { RegisterModalComponent } from './auth/register/register-modal.component';
import { ModalService } from './shared/services/auth-modal,service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, LoginModalComponent, RegisterModalComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'UI';
  constructor(public authModal: ModalService) {}

}
