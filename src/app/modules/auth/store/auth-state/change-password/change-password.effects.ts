import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './change-password.actions';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AuthApi } from 'src/app/modules/api/auth/auth.api';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class ChangePasswordEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AuthApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  changePassword$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PASSWORD),
      switchMap(action => this.api.changePassword(action.payload.model)
        .pipe(
          switchMap(() => [fromActions.CHANGE_PASSWORD_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.CHANGE_PASSWORD_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  changePasswordSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PASSWORD_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Password changed.😊' } })])
    ));

  changePasswordFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PASSWORD_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false });
}
