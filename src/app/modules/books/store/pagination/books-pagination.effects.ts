import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, delay, map, switchMap, tap } from "rxjs/operators";
import { BookApi } from "src/app/modules/api/books/book.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { DEFAULT_DELAY } from "src/app/modules/shared/common/constants";
import * as fromActions from './books-pagination.actions';

@Injectable()
export class BooksPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: BookApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {
  }

  selectBooksPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOKS_PAGE),
      map(action => action.payload.query),
      switchMap((query) => this.api.selectBooksPage(query)
        .pipe(
          switchMap((result) => [fromActions.SET_BOOKS_PAGE({ payload: { pageResult: result.pageResult } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_BOOKS_PAGE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ))

  setBooksPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_BOOKS_PAGE),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.SET_BOOKS_PAGE_SUCCESS()])
    ));

  setBookcasePageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_BOOKS_PAGE_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
