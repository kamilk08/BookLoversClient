import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { SortType } from "src/app/modules/shared/common/sort-type";

import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';
import { CHANGE_REVIEWS_PAGE, CHANGE_REVIEWS_SORT_ORDER, CHANGE_REVIEWS_SORT_TYPE, SET_BOOK_ID } from "./book-webpage.actions";

@Injectable()
export class BookWebPageFacade {

  public readonly bookId$ = this.store.select(fromSelectors.bookId);

  public readonly reviewsCount$ = this.store.select(fromSelectors.reviewsCount);
  public readonly seriesCount$ = this.store.select(fromSelectors.seriesCount)
  public readonly quotesCount$ = this.store.select(fromSelectors.quotesCount);
  public readonly authorBooksCount$ = this.store.select(fromSelectors.authorBooksCount);

  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);
  public readonly sortType$ = this.store.select(fromSelectors.sortType);
  public readonly descending$ = this.store.select(fromSelectors.descending);

  constructor(private store: Store<fromModule.BooksModuleState>) {

  }

  setBookId(bookId: number) {
    this.store.dispatch(SET_BOOK_ID({ payload: { bookId } }));
  }

  changeReviewsPage(page: number) {
    this.store.dispatch(CHANGE_REVIEWS_PAGE({ payload: { page } }));
  }

  changeSortType(sortType: SortType) {
    this.store.dispatch(CHANGE_REVIEWS_SORT_TYPE({ payload: { sortType } }));
  }

  changeSortOrder(descending: boolean) {
    this.store.dispatch(CHANGE_REVIEWS_SORT_ORDER({ payload: { descending } }));
  }

}
