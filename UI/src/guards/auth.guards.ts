import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { ModalService } from '../app/shared/services/auth-modal,service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private modalService: ModalService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getCurrentUser();

    if (!user) {
      this.modalService.openLogin(); //
      return false;
    }

    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      this.modalService.openLogin(); 
      return false;
    }

    return true;
  }
}
