import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from '../../api/auth/refreshing-tokens/models/decoded-token.model';
import { JsonToken } from '../../api/auth/refreshing-tokens/models/json-token.model';

@Injectable()
export class TokenService {

  private tokenName: string = "jwtToken";

  constructor(private readonly cookiesService: CookiesService) { }

  getRawToken() {
    return this.cookiesService.getFromCookie<JsonToken>(this.tokenName);
  }

  getDecodedToken(): DecodedToken {
    const token = this.getRawToken();
    if (token === undefined || token === null)
      return null;

    const decodedToken = new JwtHelperService().decodeToken(token.access_token) as DecodedToken;

    return decodedToken;
  }

  setRawToken(token: JsonToken) {
    this.cookiesService.setCookie(this.tokenName, token);
  }

  isAccessTokenExpired() {
    const token = this.getRawToken();
    if (token === null)
      return true;

    return this.isExpired(token.access_token);
  }

  isRefreshTokenExpired() {
    const token = this.getRawToken();
    return token === null ? true : this.isExpired(token.refresh_token);
  }

  isTokenAvailable() {
    const token = this.getRawToken();
    return token === null ? false : true;
  }

  clearTokens() {
    this.cookiesService.clearCookie(this.tokenName);
  }

  private isExpired(token: string) {
    return new JwtHelperService().isTokenExpired(token)
  }

}
