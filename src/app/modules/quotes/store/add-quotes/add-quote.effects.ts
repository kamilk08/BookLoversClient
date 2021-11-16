import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { QuotesApi } from 'src/app/modules/api/quotes/quotes.api';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AddQuoteResponse } from '../../../api/quotes/responses/add-quote.response';
import { AddQuote } from '../../../api/quotes/models/add-quote.model';
import { FETCH_QUOTE } from '../quotes/quote.actions';
import * as fromActions from './add-quote.actions';
import { QuotesFacade } from '../quotes/quote.facade';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';

@Injectable()
export class AddQuoteEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: QuotesFacade,
    private readonly api: QuotesApi,
    private readonly errorActions: ErrorActions,
    private readonly errorAdapter: ApiErrorAdapter
  ) { }

  addAuthorQuote$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_AUTHOR_QUOTE),
      switchMap(action => this.api.addAuthorQuote(new AddQuote(action.payload.quote))
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap((response: AddQuoteResponse) => [fromActions.ADD_QUOTE_SUCCESS({ payload: { quoteId: response.quoteId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_QUOTE_FALIURE({ payload: { model: this.errorAdapter.adapt(response.error) } })))
        ))
    ));

  addBookQuote$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_BOOK_QUOTE),
      switchMap(action => this.api.addBookQuote(new AddQuote(action.payload.quote))
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap((response: AddQuoteResponse) => [fromActions.ADD_QUOTE_SUCCESS({ payload: { quoteId: response.quoteId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_QUOTE_FALIURE({ payload: { model: this.errorAdapter.adapt(response.error) } })))
        ))
    ));

  addQuoteSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_QUOTE_SUCCESS),
      withLatestFrom(this.facade.addedQuote$),
      map(stream => stream[1]),
      switchMap(quote => [
        FETCH_QUOTE({ payload: { quote } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Quote added succesfully.😊' } })])
    ));

  addQuoteFailure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_QUOTE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
