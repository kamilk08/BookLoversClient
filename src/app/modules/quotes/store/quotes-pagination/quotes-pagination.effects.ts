import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { QuotesApi } from 'src/app/modules/api/quotes/quotes.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';
import { FETCH_MULTIPLE_QUOTES } from '../quotes/quote.actions';
import * as fromActions from './quotes-pagination.actions';

@Injectable()
export class QuotesPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: QuotesApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectAuthorQuotesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_AUTHOR_QUOTES_PAGE),
      switchMap((action) => this.api.getAuthorQuotes(action.payload.authorId, action.payload.query)
        .pipe(
          switchMap(response => [
            fromActions.SET_AUTHOR_QUOTES_PAGE({
              payload: {
                quotes: response.pageResult.items,
                pageResult: response.pageResult
              }
            }), FETCH_MULTIPLE_QUOTES({ payload: { quotes: response.pageResult.items } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_QUOTES_PAGE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  setAuthorQuotesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_AUTHOR_QUOTES_PAGE),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.SET_AUTHOR_QUOTES_PAGE_SUCCESS()])
    ))


  selectBookQuotesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOK_QUOTES_PAGE),
      switchMap(action => this.api.getBookQuotes(action.payload.bookId, action.payload.query)
        .pipe(
          switchMap((response) => [
            fromActions.SET_BOOK_QUOTES_PAGE({
              payload: {
                quotes: response.pageResult.items,
                pageResult: response.pageResult
              }
            }), FETCH_MULTIPLE_QUOTES({ payload: { quotes: response.pageResult.items } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_QUOTES_PAGE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  setBookQuotesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_BOOK_QUOTES_PAGE),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.SET_BOOK_QUOTES_PAGE_SUCCESS()])
    ))

  selectReaderQuotes$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_QUOTES_PAGE),
      switchMap(action => this.api.getReaderQuotes(action.payload.readerId, action.payload.query)
        .pipe(
          switchMap(response => [
            fromActions.SET_READER_QUOTES_PAGE({
              payload: {
                quotes: response.pageResult.items,
                pageResult: response.pageResult
              }
            }), FETCH_MULTIPLE_QUOTES({ payload: { quotes: response.pageResult.items } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.SET_QUOTES_PAGE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  setQuotesPageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_QUOTES_PAGE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
