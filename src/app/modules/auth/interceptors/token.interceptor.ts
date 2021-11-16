import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if(req.withCredentials) return next.handle(req);

    const jwtToken = this.tokenService.getRawToken();
    if (jwtToken !== null) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken.access_token}` }
      })
    }

    return next.handle(req);
  }

}
