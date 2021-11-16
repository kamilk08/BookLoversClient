import { TestBed } from "@angular/core/testing";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CookiesService } from "../services/cookies.service";
import { TokenService } from "../services/token.service";
import { ReaderGuard } from "./reader.guard";

describe('ReaderGuard', () => {
  let authService: AuthService;
  let guard: ReaderGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [AuthService, TokenService, CookiesService]
    });

    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  describe('when user is not logged in', () => {
    it('should navigate user to sign in page and canActivate method should return false', () => {
      let spy = spyOn(router, 'navigate');
      spyOn(authService, 'isLoggedIn').and.returnValue(false);

      guard = new ReaderGuard(authService, router);

      const canActivate = guard.canActivate(undefined, undefined);

      expect(spy).toHaveBeenCalledWith(['sign_in']);
      expect(canActivate).toBeFalsy();

    })
  });

  describe('when user is logged in', () => {
    it('canActivate method should return true', () => {
      spyOn(authService, 'isLoggedIn').and.returnValue(true);

      guard = new ReaderGuard(authService, router);

      const canActivate = guard.canActivate(undefined, undefined);

      expect(canActivate).toBeTruthy();
    })
  })
})
