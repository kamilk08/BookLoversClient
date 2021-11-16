import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromIndex from '../index';
import * as fromSelectors from './reviews-page.selectors';
import { NEXT_REVIEWS_PAGE, SET_READER_ID_ON_REVIEWS_PAGE, SET_REVIEWS_PAGE_SIZE } from "./reviews-page.actions";

@Injectable()
export class ReviewsPageFacade {

  public readonly readerId$ = this.store.select(fromSelectors.readerId);
  public readonly pageSize$ = this.store.select(fromSelectors.pageSize);

  constructor(private store: Store<fromIndex.ReviewsModuleState>) {

  }

  setReaderIdOnReviewsPage(readerId: number) {
    this.store.dispatch(SET_READER_ID_ON_REVIEWS_PAGE({ payload: { readerId } }))
  }

  setPageSize(pageSize: number) {
    this.store.dispatch(SET_REVIEWS_PAGE_SIZE({ payload: { pageSize } }));
  }

  nextReviewsPage(page: number) {
    this.store.dispatch(NEXT_REVIEWS_PAGE({ payload: { page } }))
  }
}
