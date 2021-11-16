import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TokenRefreshApi } from 'src/app/modules/api/auth/refreshing-tokens/token-refresh.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { TokenService } from '../../services/token.service';
import { ASSIGN_USER } from '../../store/auth-state/auth.actions';
import * as fromActions from './refresh-token.actions';

@Injectable()
export class RefreshTokenEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: TokenRefreshApi,
    private readonly tokenService: TokenService,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {

  }

  refreshToken$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REFRESH_TOKEN),
      switchMap((action) => this.api.refresh(action.payload.refreshToken)
        .pipe(
          tap(() => this.tokenService.clearTokens()),
          tap(token => this.tokenService.setRawToken(token)),
          switchMap((token) => [fromActions.REFRESH_TOKEN_SUCCESS({ payload: { refreshToken: token.refresh_token } })]),
          catchError((response: HttpErrorResponse) =>
            of(fromActions.REFRESH_TOKEN_FALIURE({
              payload:
                { error: this.adapter.adapt(response.error) }
            })))
        )),
    ));

  refershTokenSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REFRESH_TOKEN_SUCCESS),
      switchMap(() => [ASSIGN_USER()])
    ));

  refreshTokenFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REFRESH_TOKEN_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
