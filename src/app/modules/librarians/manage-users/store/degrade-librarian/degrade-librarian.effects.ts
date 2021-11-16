import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ManageLibrarianApi } from 'src/app/modules/api/librarians/api/manage-librarian.api';
import { PromotionStatus } from 'src/app/modules/api/librarians/models/promotion-status.model';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { UPDATE_PROMOTION_WAITER } from '../promotion-waiters/promotion-waiters.actions';
import * as fromActions from './degrade-librarian.actions';

@Injectable()
export class DegradeLibrarianEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ManageLibrarianApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {
  }

  degradeLibrarian$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.DEGRADE_LIBRARIAN),
      switchMap(action => this.api.degradeLibrarian(action.payload.readerGuid)
        .pipe(
          switchMap(() => [fromActions.DEGRADE_LIBRARAIN_SUCCESS({ payload: { readerGuid: action.payload.readerGuid } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.DEGRADE_LIBRARIAN_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  degradeLibrarianSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.DEGRADE_LIBRARAIN_SUCCESS),
      switchMap((action) => [
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Librarian degraded successfully! 😊' } }),
        UPDATE_PROMOTION_WAITER({ payload: { readerGuid: action.payload.readerGuid, status: PromotionStatus.notAvailable } })
      ])
    ));

  degradeLibrarianFailure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.DEGRADE_LIBRARIAN_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false });

}
