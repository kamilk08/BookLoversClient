import 'jasmine';
import { TestBed } from "@angular/core/testing";
import { LibrarianGuard } from "./librarian.guard";
import { AuthService } from '../services/auth.service';
import { CookiesService } from '../services/cookies.service';
import { TokenService } from '../services/token.service';

describe('LibrarianGuard tests', () => {
  let librarianGuard: LibrarianGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, TokenService, CookiesService]
    });

    authService = TestBed.get(AuthService);
  });

  describe('when user is not logged in', () => {
    it('canActivate method should return false', () => {
    spyOn(authService, 'isLoggedIn')
        .and.returnValue(false);

      librarianGuard = new LibrarianGuard(authService);
      const result = librarianGuard.canActivate(undefined);

      expect(result).toBeFalsy();
    });
  });

  describe('when user is logged in', () => {
    describe('and user is librarian', () => {
      it('canActivate method should return true', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOnProperty(authService, 'isLibrarian').and.returnValue(true);

        librarianGuard = new LibrarianGuard(authService);
        const result = librarianGuard.canActivate(undefined);

        expect(result).toBeTruthy();
      })
    });
    describe('and user is not librarian', () => {
      it('canActivate method should return false', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        spyOnProperty(authService, 'isLibrarian').and.returnValue(false);

        librarianGuard = new LibrarianGuard(authService);
        const result = librarianGuard.canActivate(undefined);

        expect(result).toBeFalsy();
      })
    })
  })
})
