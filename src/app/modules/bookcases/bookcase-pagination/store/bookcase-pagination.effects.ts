import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, tap, switchMap } from 'rxjs/operators';
import * as fromActions from './bookcase-pagination.actions';
import { of } from 'rxjs';
import { BookcasePaginationApi } from 'src/app/modules/api/bookcases/pagination/bookcase-pagination.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class BookcasePaginationEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: BookcasePaginationApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectBookcasePage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOKCASE_PAGE),
      switchMap(action => this.api.getBookcaseCollection(action.payload.bookcaseId, action.payload.query)
        .pipe(
          switchMap(pageResult => [fromActions.SET_BOOKCASE_PAGE({ payload: { pageResult } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.BOOKCASE_PAGE_ACTION_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  bookcasePageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BOOKCASE_PAGE_ACTION_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
