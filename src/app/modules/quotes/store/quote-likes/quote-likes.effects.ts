import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { QuotesApi } from 'src/app/modules/api/quotes/quotes.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { UPDATE_QUOTE } from '../quotes/quote.actions';
import { QuotesFacade } from '../quotes/quote.facade';
import * as fromActions from './quote-likes.actions';

@Injectable()
export class QuoteLikesEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: QuotesFacade,
    private readonly api: QuotesApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  likeQuote$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LIKE_QUOTE),
      switchMap(action => this.api.likeQuote(action.payload.quote.identification.guid)
        .pipe(
          switchMap(() => [fromActions.LIKE_QUOTE_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.LIKE_QUOTE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  likeQuoteSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LIKE_QUOTE_SUCCESS),
      withLatestFrom(this.facade.likedQuote$),
      map(stream => stream[1]),
      switchMap((quote) => [UPDATE_QUOTE({ payload: { quote } }), SHOW_SUCCESS_MESSAGE({ payload: { message: 'Quote liked successfully.😊' } })])
    ));

  likeQuoteFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LIKE_QUOTE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });


  unLikeQuote$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNLIKE_QUOTE),
      switchMap(action => this.api.unLikeQuote(action.payload.quote.identification.guid)
        .pipe(
          switchMap(() => [fromActions.UNLIKE_QUOTE_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.UNLIKE_QUOTE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } }))
          ))
      )));

  unLikeQuoteSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNLIKE_QUOTE_SUCCESS),
      withLatestFrom(this.facade.likedQuote$),
      map(stream => stream[1]),
      switchMap((quote) => [
        UPDATE_QUOTE({ payload: { quote } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Quote unliked successfully.😊' } })])
    ));

  unLikeQuoteFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNLIKE_QUOTE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
