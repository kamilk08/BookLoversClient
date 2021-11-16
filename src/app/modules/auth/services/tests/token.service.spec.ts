import { TestBed } from "@angular/core/testing"
import { JsonToken } from "src/app/modules/api/auth/refreshing-tokens/models/json-token.model";
import { CookiesService } from "../cookies.service";
import { TokenService } from "../token.service";

describe('token service', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TokenService, CookiesService]
    });

    tokenService = TestBed.get(TokenService);
  })

  describe('getRawToken', () => {
    it('should return object of type JsonToken', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refresh_token: '',
        expires_in: 1516239022,
        token_type: 'JWT'
      };

      tokenService.setRawToken(token);

      const tokenFromService = tokenService.getRawToken();

      expect(tokenFromService).toBeDefined();
      expect(tokenFromService.access_token).toEqual(token.access_token);
    })
  });

  describe('getDecodedToken', () => {
    it('should return object of type DecodedToken', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refresh_token: '',
        expires_in: 1516239022,
        token_type: 'JWT'
      };

      tokenService.setRawToken(token);

      const decodedToken = tokenService.getDecodedToken();

      expect(decodedToken).toBeDefined();
    });

    it('should return null when token is invalid', () => {

      tokenService.setRawToken({} as any);

      const decodedToken = tokenService.getDecodedToken();

      expect(decodedToken).toBe(null);
    })
  });

  describe('isAccessTokenExpired', () => {
    it('should show that access token is expired', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjIyMn0.mYQza3jvP4TL28BqPejaxNVqH3KZhHORQASNHeaiGfg',
        refresh_token: '',
        expires_in: 222,
        token_type: 'JWT'
      };
      tokenService.setRawToken(token);

      const isExpired = tokenService.isAccessTokenExpired();

      expect(isExpired).toBeTruthy();

    });

    it('should show that access token is still up to date', () => {
      const token: JsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxMTExMTExMTExMX0.GN-qY8lTD22OkprUt3zqZKQP30NodygP3biDACF1BgI',
        refresh_token: '',
        expires_in: 11111111111,
        token_type: 'JWT'
      };

      tokenService.setRawToken(token);

      const isExpred = tokenService.isAccessTokenExpired();

      expect(isExpred).toBeFalsy();

    })
  });
});


