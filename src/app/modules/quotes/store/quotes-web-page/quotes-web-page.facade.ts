import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromIndex from '../index';
import * as fromSelectors from '../quotes-web-page/quotes-web-page.selectors';
import { CHANGE_BOOK_QUOTES_PAGE, CHANGE_BOOK_QUOTES_SORT_ORDER, SET_BOOK_QUOTES_ID } from "./quotes-web-page.actions";

@Injectable()
export class QuotesWebPageFacade {

  public readonly bookQuotesId$ = this.store.select(fromSelectors.bookId);
  public readonly descending$ = this.store.select(fromSelectors.descending);
  public readonly qoutesCount$ = this.store.select(fromSelectors.qoutesCount);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);

  constructor(private readonly store: Store<fromIndex.QuotesState>) {

  }

  setBookId(bookId: number) {
    this.store.dispatch(SET_BOOK_QUOTES_ID({ payload: { bookId } }));
  }

  changeBookQuotesOrder(descending: boolean) {
    this.store.dispatch(CHANGE_BOOK_QUOTES_SORT_ORDER({ payload: { descending } }));
  }

  changeBookQuotesPage(page: number) {
    this.store.dispatch(CHANGE_BOOK_QUOTES_PAGE({ payload: { page } }));
  }
}
