import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { AuthApi } from "src/app/modules/api/auth/auth.api";
import { BlockAccount } from "src/app/modules/api/auth/models/block-account.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { PromotionStatus } from "src/app/modules/api/librarians/models/promotion-status.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { UPDATE_PROMOTION_WAITER } from "src/app/modules/librarians/manage-users/store/promotion-waiters/promotion-waiters.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import * as fromActions from './block-account.actions';

@Injectable()
export class BlockAccountEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: AuthApi,
    private readonly errorActions: ErrorActions,
    private readonly errorsAdapter: ApiErrorAdapter
  ) { }

  blockAccount$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BLOCK_ACCOUNT),
      switchMap(action => this.api.blockAccount(new BlockAccount(action.payload.readerGuid))
        .pipe(
          switchMap(() => [fromActions.BLOCK_ACCOUNT_SUCCESS({ payload: { readerGuid: action.payload.readerGuid } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.BLOCK_ACCOUNT_FALIURE({ payload: { error: this.errorsAdapter.adapt(response.error) } })))
        ))
    ));

  blockAccountSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BLOCK_ACCOUNT_SUCCESS),
      switchMap((action) => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'User account blocked successfully.😊' } }),
        UPDATE_PROMOTION_WAITER({ payload: { readerGuid: action.payload.readerGuid, status: PromotionStatus.notAvailable } })
      ])
    ));

  blockAccountFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BLOCK_ACCOUNT_FALIURE),
      tap((action => this.errorActions.reactToApiError(action.payload.error)))
    ), { dispatch: false })

}
