import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VerifyAccountApi } from '../../../../api/auth/complete-registration/verify-account.api';
import * as fromActions from './verify-account.actions';
import { switchMap, tap, catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';

@Injectable()
export class VerifyAccountEffects {

  constructor(
    public readonly errorActions: ErrorActions,
    private readonly actions$: Actions,
    private readonly api: VerifyAccountApi,
    private readonly errorsAdapter: ApiErrorAdapter
  ) { }

  verifyAccount$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.VERIFY_ACCOUNT),
      switchMap((action) => this.api.verifyAccount(action.payload.model)
        .pipe(
          switchMap(() => [fromActions.VERIFY_ACCOUNT_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.VERIFY_ACCOUNT_FALIURE({ payload: { error: this.errorsAdapter.adapt(response.error) } }))),
          delay(DEFAULT_DELAY)
        ))
    ));

  verifyAccountSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.VERIFY_ACCOUNT_SUCCESS),
      switchMap(() => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Account verified successfully.😊' } }),
        MOVE_TO({ payload: { moveTo: { path: ['sign_in'] } } })
      ])
    ));

  verifyAccountFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.VERIFY_ACCOUNT_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false });
}
