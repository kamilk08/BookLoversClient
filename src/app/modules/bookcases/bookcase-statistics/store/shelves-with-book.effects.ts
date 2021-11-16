import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './shelves-with-book.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookcaseStatisticsApi } from 'src/app/modules/api/bookcases/statistics/bookcase-statistics.api';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class ShelvesWithBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions,
    private readonly api: BookcaseStatisticsApi) { }

  selectShelvesWithBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_SHELVES_WITH_BOOK),
      mergeMap(action => this.api.getShelvesWithBook(action.payload.bookId, action.payload.query)
        .pipe(
          map(response => fromActions.FETCH_SHELVES_WITH_BOOK({ payload: { statistics: response } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SHELVES_WITH_BOOK_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  shelvesWithBookFetchFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_SHELVES_WITH_BOOK_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
