import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, delay, mergeMap, switchMap, tap } from "rxjs/operators";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ManageLibrarianApi } from "src/app/modules/api/librarians/api/manage-librarian.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { DEFAULT_DELAY } from "src/app/modules/shared/common/constants";
import * as fromActions from './promotion-waiters-pagination.actions';
import { FETCH_PROMOTION_WAITERS } from "./promotion-waiters.actions";

@Injectable()
export class PromotionWaitersPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ManageLibrarianApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {

  }

  selectPromotionWaitersPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PROMOTION_WAITERS_PAGE),
      mergeMap(action => this.api.getPromotionsPage(action.payload.ids, action.payload.query)
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap((response) => [
            fromActions.FETCH_PROMOTION_WAITERS_PAGE({ payload: { result: response.pageResult } }),
            FETCH_PROMOTION_WAITERS({ payload: { entities: response.promotionWaiters } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.SELECT_PROMOTION_WAITERS_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));


  selectPromotionWaitersError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PROMOTION_WAITERS_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
