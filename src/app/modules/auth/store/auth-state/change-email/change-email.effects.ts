import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './change-email.actions';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AuthApi } from 'src/app/modules/api/auth/auth.api';
import { SignInApi } from 'src/app/modules/api/auth/sign-in/sign-in.api';
import { Credentials } from 'src/app/modules/api/auth/sign-in/models/credentials.model';
import { TokenService } from '../../../services/token.service';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ChangeEmailEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AuthApi,
    private readonly signInApi: SignInApi,
    private readonly tokenService: TokenService,
    private readonly errorActions: ErrorActions,
    private readonly errorsAdapter: ApiErrorAdapter
  ) { }

  changeEmail$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_EMAIL),
      switchMap(action => this.api.changeEmail(action.payload.model)
        .pipe(
          switchMap((res) => [fromActions.CHANGE_EMAIL_SUCCESS({ payload: { model: action.payload.model } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.CHANGE_EMAIL_FALIURE({ payload: { error: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  changeEmailSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_EMAIL_SUCCESS),
      switchMap(action => this.signInApi.signIn(new Credentials(action.payload.model.nextEmail, action.payload.model.password))),
      tap(() => this.tokenService.clearTokens()),
      tap(token => this.tokenService.setRawToken(token)),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Email successfully changed.😊' } })])
    ));

  changeEmailFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_EMAIL_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
