import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { GeneratePasswordModel } from "src/app/modules/api/auth/reset-password/models/generate-password.model";
import { ResetPasswordApi } from "src/app/modules/api/auth/reset-password/reset-password.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";

import * as fromActions from '../store/generate-token.actions'

@Injectable()
export class GenerateTokenEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ResetPasswordApi,
    private readonly errorActions: ErrorActions,
    private readonly errorAdapter: ApiErrorAdapter
  ) {

  }

  submitForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_PASSWORD_TOKEN_FORM),
      map(action => { return { valid: action.payload.form.valid, email: action.payload.form.get('email').value } }),
      switchMap(data => data.valid ? [fromActions.GENERATE_PASSWORD_TOKEN({ payload: { email: data.email } })] : [fromActions.PASSWORD_TOKEN_FORM_INVALID()])
    ))

  generateToken$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.GENERATE_PASSWORD_TOKEN),
      map(action => action.payload.email),
      switchMap((email: string) => this.api.generateToken(new GeneratePasswordModel(email))
        .pipe(
          switchMap(() => [fromActions.GENERATE_PASSWORD_TOKEN_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.GENERATE_PASSWORD_TOKEN_FALIURE({ payload: { error: this.errorAdapter.adapt(response.error) } })))
        ))
    ));

  generateTokenSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.GENERATE_PASSWORD_TOKEN_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Password token was sent successfully to given email 😊' } })])
    ));

  generateTokenFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.GENERATE_PASSWORD_TOKEN_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false });

}
