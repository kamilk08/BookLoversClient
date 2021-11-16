import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { RefreshTokenFacade } from "src/app/modules/auth/refreshing/store/refresh-token.facade";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { TokenService } from "src/app/modules/auth/services/token.service";

@Injectable()
export class AddBookGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private tokensFacade: RefreshTokenFacade) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    else {
      if (!this.tokenService.isRefreshTokenExpired()) {
        const rawToken = this.tokenService.getRawToken();
        this.tokensFacade.refresh(rawToken.refresh_token);
        return this.tokensFacade.isRefreshing$
          .pipe(
            switchMap(isRefreshing => {
              if (!isRefreshing) {
                return this.tokensFacade.refreshToken$
                  .pipe(
                    switchMap((token: string) => [token === undefined ? this.router.createUrlTree(['/sign_in']) : true]),
                  )
              }
              else {
                return this.tokensFacade.refreshToken$
                  .pipe(
                    switchMap((token: string) => [token === undefined ? this.router.createUrlTree(['/sign_in']) : true])
                  )
              }
            })
          )
      }
      else return this.router.createUrlTree(['/sign_in']);
    }
  }

}


