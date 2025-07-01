import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private loginVisible = new BehaviorSubject(false);
  private registerVisible = new BehaviorSubject(false);

  login$ = this.loginVisible.asObservable();
  register$ = this.registerVisible.asObservable();

  openLogin() {
    this.loginVisible.next(true);
    document.body.style.overflow = 'hidden';
  }

  closeLogin() {
    this.loginVisible.next(false);
    document.body.style.overflow = 'auto';
  }

  openRegister() {
    this.registerVisible.next(true);
    document.body.style.overflow = 'hidden';
  }

  closeRegister() {
    this.registerVisible.next(false);
    document.body.style.overflow = 'auto';
  }
}
