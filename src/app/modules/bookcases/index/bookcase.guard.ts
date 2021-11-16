import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map, skip, skipUntil, switchMap } from "rxjs/operators";
import { AuthService } from "../../auth/services/auth.service";
import { noNullOrUndefined } from "../../shared/common/operator-extensions";
import { Privacy } from "../../shared/models/privacy";
import { Bookcase } from "../models";
import { BookcaseFacade } from "../store/bookcases/bookcase.facade";

@Injectable()
export class BookcaseGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly bookcaseFacade: BookcaseFacade,
    private readonly router: Router
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLoggedIn = this.authService.isLoggedIn();
    const userId = +route.paramMap.get('id');

    if (isLoggedIn) return true;

    return this.bookcaseFacade.bookcaseByUser$(userId)
      .pipe(
        map(bookcase => [bookcase, bookcase === undefined]),
        map(stream => {
          if (stream[1]) return this.router.createUrlTree(['unauthorized']);
          else {
            const bookcase = stream[0] as Bookcase;
            if (bookcase.settings.privacy === Privacy.Public.id) return true
            else return this.router.createUrlTree(['unauthorized']);
          }
        })
      )

  }

}
