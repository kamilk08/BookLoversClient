import { TestBed } from "@angular/core/testing"
import { JsonToken } from "../../../api/auth/refreshing-tokens/models/json-token.model"
import { AuthService } from "../auth.service"
import { CookiesService } from "../cookies.service"
import { TokenService } from "../token.service"

describe('auth service', () => {
  let tokenService: TokenService;
  let authService: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, TokenService, CookiesService]
    });

    tokenService = TestBed.get(TokenService);
    authService = TestBed.get(AuthService);
  });

  describe('isReader', () => {
    it('should return true if token contains reader role ', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOlsiUmVhZGVyIl0sInVzZXJJZCI6IjEiLCJlbWFpbCI6ImZvb0BnbWFpbC5jb20ifQ.jJujyyMPjOWyxHJ4cEGA6AzlJfwryMlK4ro-kdqF29c',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      }

      tokenService.setRawToken(token);

      const isReader = authService.isReader;
      expect(isReader).toBeTruthy();
    });

    it('should return false if token does not have reader role', () => {

      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOltdLCJ1c2VySWQiOiIxIiwiZW1haWwiOiJmb29AZ21haWwuY29tIn0.n_dJK-mqHHGJrB14ajm9JJ2NA82lT7RcApDiIGABR_s',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      }

      tokenService.setRawToken(token);

      expect(authService.isReader).toBeFalsy();
    })

  });

  describe('isLibrarian', () => {
    it('should return true if token contains librarian role', () => {

      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOlsiTGlicmFyaWFuIl0sInVzZXJJZCI6IjEiLCJlbWFpbCI6ImZvb0BnbWFpbC5jb20ifQ.0s6MJ34bCOkMAJ_uSxNU6QngAkdJcJwAh80witeGaXc',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      }

      tokenService.setRawToken(token);

      expect(authService.isLibrarian).toBeTruthy();
    });

    it('should return false if token does not contain librarian role', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOlsicmVhZGVyIl0sInVzZXJJZCI6IjEiLCJlbWFpbCI6ImZvb0BnbWFpbC5jb20ifQ.bRrQLPF0584eZXlQkJS2pmpe5fp6H_Emp-364UvkdYM',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      }

      tokenService.setRawToken(token);

      const isReader = authService.isLibrarian;
      expect(isReader).toBeFalsy();
    })
  })

  describe('getUserId', () => {
    it('should return user Id when token contains one', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOlsiTGlicmFyaWFuIl0sInVzZXJJZCI6IjEiLCJlbWFpbCI6ImZvb0BnbWFpbC5jb20ifQ.0s6MJ34bCOkMAJ_uSxNU6QngAkdJcJwAh80witeGaXc',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      }

      tokenService.setRawToken(token);

      expect(authService.userId).toBeDefined();
    })

    it('should return 0 when token does not have user Id', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOlsiTGlicmFyaWFuIl0sInVzZXJJZCI6IiIsImVtYWlsIjoiZm9vQGdtYWlsLmNvbSJ9.o9guARD5HXIdUCPcPFukUSePR-s93GqAxNqYCV0foCI',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      };

      tokenService.setRawToken(token);

      expect(authService.userId).toBe(0);
    })
  });

  describe('isLoggednIn', () => {
    it('should return true when user has a valid token', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTExMSwicm9sZXMiOlsiUmVhZGVyIl0sInVzZXJJZCI6IjEiLCJlbWFpbCI6ImZvb0BnbWFpbC5jb20ifQ.jJujyyMPjOWyxHJ4cEGA6AzlJfwryMlK4ro-kdqF29c',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: "JWT"
      }

      tokenService.setRawToken(token);

      const isLoggednIn = authService.isLoggedIn();

      expect(isLoggednIn).toBeTruthy();
    });

    it('should return false when user does not have a valid token or token is expired', () => {

      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhdWQiOiIxMjIyMzQ1IiwiZXhwIjoxMTExMTExMTEsInJvbGVzIjpbIkxpYnJhcmlhbiJdLCJ1c2VySWQiOiIiLCJlbWFpbCI6ImZvb0BnbWFpbC5jb20ifQ.3ZdlXd18teYA9HXzV4IPi4Gp5TxQj3jP1t8_8oJ8Kyo',
        refresh_token: '',
        expires_in: 111111111,
        token_type: "JWT"
      };

      tokenService.setRawToken(token);

      const isLoggedIn = authService.isLoggedIn();

      expect(isLoggedIn).toBeFalsy();
    })
  })
})
