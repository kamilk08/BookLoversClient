import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ReaderGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const canAccess = this.authService.isLoggedIn();
    if (!canAccess) {
      this.router.navigate([`sign_in`]);
      return false;
    }

    return true;
  }

}
