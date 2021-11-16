import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { BookFacade } from "src/app/modules/books/store/book.facade";
import { QUOTES_PAGE_QUERY } from "../../models/quotes-page.query";

import * as fromActions from '../quotes-web-page/quotes-web-page.actions';
import { QuotesFacade } from "../quotes/quote.facade";
import { QuotesWebPageFacade } from "./quotes-web-page.facade";

@Injectable()
export class QuotesWebPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly pageFacade: QuotesWebPageFacade,
    private readonly quotesFacade: QuotesFacade,
    private readonly bookFacade: BookFacade
  ) {

  }

  setBookQuoteId$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_BOOK_QUOTES_ID),
      map(action => action.payload.bookId),
      tap((bookId) => this.bookFacade.selectBook(bookId)),
      tap((bookId) => this.quotesFacade.selectBookQuotes(bookId, QUOTES_PAGE_QUERY()))
    ), { dispatch: false });

  changeBookQuotesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_BOOK_QUOTES_PAGE),
      withLatestFrom(this.pageFacade.bookQuotesId$, this.pageFacade.qoutesCount$, this.pageFacade.descending$),
      map(stream => {
        return { page: stream[0].payload.page, bookId: stream[1], qoutesCount: stream[2], desceding: stream[3] }
      }),
      tap((stream) => this.quotesFacade.selectBookQuotes(stream.bookId, QUOTES_PAGE_QUERY(stream.qoutesCount, stream.page, stream.desceding)))
    ), { dispatch: false });


  changeBookQuotesOrder$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_BOOK_QUOTES_SORT_ORDER),
      withLatestFrom(this.pageFacade.bookQuotesId$, this.pageFacade.qoutesCount$, this.pageFacade.currentPage$),
      map(stream => {
        return { bookId: stream[1], descending: stream[0].payload.descending, qoutesCount: stream[2], page: stream[3] }
      }),
      tap(stream => this.quotesFacade.selectBookQuotes(stream.bookId, QUOTES_PAGE_QUERY(stream.qoutesCount, stream.page, stream.descending)))
    ), { dispatch: false })

}
