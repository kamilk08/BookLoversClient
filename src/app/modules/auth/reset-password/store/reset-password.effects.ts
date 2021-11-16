import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { ResetPasswordModel } from "src/app/modules/api/auth/reset-password/models/reset-password.model";
import { ResetPasswordApi } from "src/app/modules/api/auth/reset-password/reset-password.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";

import * as fromActions from '../store/reset-password.actions';

@Injectable()
export class ResetPasswordEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ResetPasswordApi,
    private readonly errorActions: ErrorActions,
    private readonly errorAdapter: ApiErrorAdapter
  ) {

  }

  resetPassword$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RESET_PASSWORD),
      switchMap(action => this.api.resetPassword(new ResetPasswordModel(action.payload.token, action.payload.password))
        .pipe(
          switchMap(() => [fromActions.RESET_PASSWORD_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.RESET_PASSWORD_FALIURE({ payload: { error: this.errorAdapter.adapt(response.error) } })))
        ))
    ));

  resetPasswordSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RESET_PASSWORD_SUCCESS),
      switchMap(() => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Password reset successfully 😊' } }),
        MOVE_TO({ payload: { moveTo: { path: ['sign_in'] } } })
      ])
    ));

  resetPasswordFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RESET_PASSWORD_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
