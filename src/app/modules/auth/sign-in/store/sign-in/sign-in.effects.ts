import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, switchMap, map, delay, catchError, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import * as fromActions from './sign-in.actions';
import { JsonToken } from 'src/app/modules/api/auth/refreshing-tokens/models/json-token.model';
import { SignInApi } from '../../../../api/auth/sign-in/sign-in.api';
import { ASSIGN_USER } from '../../../store/auth-state/auth.actions';
import { SignInFacade } from '../sign-in.facade';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { SET_REFRESH_TOKEN } from '../../../refreshing/store/refresh-token.actions';
import { TokenService } from '../../../services/token.service';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';


@Injectable()
export class SignInEffects {

  constructor(private readonly actions$: Actions,
    private readonly tokenService: TokenService,
    private readonly facade: SignInFacade,
    private readonly signInApi: SignInApi) { }

  submitSignInForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_SIGN_IN_FORM),
      map(action => action.payload.form.valid),
      switchMap((flag) => [flag ? fromActions.SIGN_IN_FORM_VALID() : fromActions.SIGN_IN_FORM_INVALID()])
    ));

  signInFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_IN_FORM_VALID),
      withLatestFrom(this.facade.credentials$),
      map(stream => stream[1]),
      switchMap((credentials) => [fromActions.SIGN_IN({ payload: { credentials } })])
    ));

  signIn$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_IN),
      switchMap((action) => this.signInApi.signIn(action.payload.credentials)
        .pipe(
          map((token: JsonToken) => token !== null ? fromActions.SIGN_IN_SUCCESS({ payload: { token } }) : fromActions.SIGN_IN_FALIURE({ payload: { error: 'Invalid credentials' } })),
          catchError((response: HttpErrorResponse) => of(fromActions.SIGN_IN_FALIURE({ payload: { error: 'Invalid credentials' } }))),
          delay(DEFAULT_DELAY)
        )),

    ));

  signInSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_IN_SUCCESS),
      tap(() => this.tokenService.clearTokens()),
      tap(action => this.tokenService.setRawToken(action.payload.token)),
      switchMap((action) => [
        ASSIGN_USER(),
        SET_REFRESH_TOKEN({ payload: { refreshToken: action.payload.token.refresh_token } }),
        MOVE_TO({ payload: { moveTo: { path: ['home'] } } })
      ])
    ));

  signInFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_IN_FALIURE),
      switchMap(() => [fromActions.SET_SIGN_IN_ERROR_ON_FORM()])
    ));
}
