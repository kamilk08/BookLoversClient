import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { catchError, distinctUntilChanged, filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { ErrorsFacade } from '../store/errors.facade';
import { Injectable } from '@angular/core';
import { RefreshTokenFacade } from '../../auth/refreshing/store/refresh-token.facade';
import { TokenService } from '../../auth/services/token.service';
import { throwError } from 'rxjs';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {

  private statusCode = 401;

  constructor(private readonly tokenService: TokenService,
    private readonly tokenFacade: RefreshTokenFacade,
    private readonly errorsFacade: ErrorsFacade
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err: HttpResponse<any>) => {
        if (err.status === this.statusCode)
          return this.handle(req, next, err);

        return throwError(err);
      }))
  }

  handle(request: HttpRequest<any>, next: HttpHandler, error: HttpResponse<any>) {
    const rawToken = this.tokenService.getRawToken();
    if (!this.tokenService.isAccessTokenExpired()) {
      this.errorsFacade.throwUnAuthorizedError(error);
      return throwError(error);
    }
    if (!this.tokenService.isRefreshTokenExpired()) {
      console.log('refresh in interceptor');
      this.tokenFacade.refresh(rawToken.refresh_token);
      return this.handle401Error(request, next, error);
    } else {
      this.errorsFacade.throwUnAuthorizedError(error);
      return throwError(error);
    }
  };

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, error: HttpResponse<any>) {

    return this.tokenFacade.isRefreshing$
      .pipe(
        withLatestFrom(this.tokenFacade.refreshToken$, this.tokenFacade.isSuccess$),
        map(stream => { return { isRefreshing: stream[0], refreshToken: stream[1], isSuccess: stream[2] } }),
        switchMap(stream => {
          if (!stream.isRefreshing) {
            if (stream.isSuccess) {
              return next.handle(this.addTokenToRequest(request, this.tokenService.getRawToken().access_token));
            }
            else {
              return this.tokenFacade.refreshToken$
                .pipe(
                  tap(() => this.errorsFacade.throwUnAuthorizedError(error)),
                  take(1),
                  switchMap(() => next.handle(request))
                )
            }
          }
          else {
            return this.tokenFacade.refreshToken$
              .pipe(
                withLatestFrom(this.tokenFacade.isSuccess$),
                map(stream => { return { token: stream[0], isSuccess: stream[1] } }),
                filter(stream => stream.token !== undefined && stream.isSuccess !== true),
                take(1),
                switchMap((res) => next.handle(this.addTokenToRequest(request, this.tokenService.getRawToken().access_token)))
              )
          }
        })
      )
  };

  private addTokenToRequest(req: HttpRequest<any>, token: string) {
    return req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })
  };

}
