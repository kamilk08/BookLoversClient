import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './bookcases-with-book.actions';
import { map, catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BookcaseStatisticsApi } from 'src/app/modules/api/bookcases/statistics/bookcase-statistics.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class BookcasesWithBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookcaseStatisticsApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectBookcasesWithBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOKCASES_WITH_BOOK),
      switchMap(action => this.api.getBookcasesWithBook(action.payload.bookId)
        .pipe(
          map((bookcasesIds: number[]) => fromActions.FETCH_BOOKCASE_WITH_BOOK({ payload: { bookcasesIds, bookId: action.payload.bookId } })),
          catchError((response: HttpErrorResponse) => of(fromActions.BOOKCASE_WITH_BOOK_FETCH_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  bookcasesWithBookActionFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BOOKCASE_WITH_BOOK_FETCH_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
