import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LibrarianGuard implements CanActivate {

  constructor(private authFacade: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let canAccess = false;
    const isLoggedIn = this.authFacade.isLoggedIn();
    if (isLoggedIn && this.authFacade.isLibrarian)
      canAccess = true;

    return canAccess;
  }

}
