import { Injectable } from "@angular/core";
import { TokenService } from './token.service';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

@Injectable()
export class AuthService {
  private readerRole = 'Reader';
  private librarianRole = 'Librarian';
  private superAdminRole = 'SuperAdmin';

  constructor(private readonly tokenService: TokenService) { }

  get isReader() {
    return this.checkRole(this.readerRole);
  }

  get isLibrarian() {
    return this.checkRole(this.librarianRole);
  }

  get isSuperAdmin() {
    return this.checkRole(this.superAdminRole);
  }

  get userGuid() {
    const token = this.tokenService.getDecodedToken();
    return token === null ? undefined : token.sub;
  }

  get userId() {
    const token = this.tokenService.getDecodedToken();
    return token === null ? undefined : +token.userId;
  }

  get email() {
    const token = this.tokenService.getDecodedToken();
    return token === null ? undefined : token.email;
  }


  isLoggedIn() {
    if (!this.tokenService.isTokenAvailable()) return false;

    if (!this.tokenService.isRefreshTokenExpired()) return true;

    if (!this.tokenService.isAccessTokenExpired()) return true;

    return false;
  }

  private checkRole(role: string) {
    const decodedToken = this.tokenService.getDecodedToken();
    if (decodedToken === null || decodedToken === undefined)
      return false;

    if (decodedToken.roles instanceof Array) {
      return decodedToken.roles.some(r => r == role);
    }
    else return decodedToken.roles === role;
  }

}
