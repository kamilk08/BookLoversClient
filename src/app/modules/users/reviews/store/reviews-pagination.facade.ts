import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { REORDER_REVIEWS_PAGE, SELECT_BOOK_REVIEWS_PAGE } from './book-reviews/reviews-pagination.actions';
import { SELECT_READER_REVIEWS_PAGE } from './reader-reviews/reader-reviews-pagination.actions';
import { OrderedQuery } from 'src/app/modules/shared/common/query';
import * as fromModule from './index';
import * as fromSelectors from './module.selectors';


@Injectable()
export class ReviewsPaginationFacade {

  constructor(private store: Store<fromModule.ReviewsModuleState>) { }

  public readonly paginatedReviews$ = this.store.select(fromSelectors.paginatedReviews);

  public readonly bookReviewsPageResult$ = this.store.select(fromSelectors.bookReviewsPageResult);
  public readonly bookReviewsCurrentPage$ = this.store.select(fromSelectors.currentBookReviewsPage);
  public readonly bookReviewsTotalCount$ = this.store.select(fromSelectors.bookReviewsTotalCount);
  public readonly processingBookReviewsPage$ = this.store.select(fromSelectors.processingBookNextPage);

  public readonly readerReviewsPageResult$ = (readerId: number) => this.store.select(fromSelectors.readerReviewsPageResult(readerId));
  public readonly readerPageResultReviews$ = (readerId:number)=>this.store.select(fromSelectors.readerPageResultReviews(readerId))
  public readonly currentReaderReviewsPage$ = (readerId: number) => this.store.select(fromSelectors.currentReaderReviewsPage(readerId));
  public readonly readerReviewsTotalCount$ = (readerId: number) => this.store.select(fromSelectors.readerReviewsTotalCount(readerId));
  public readonly processingReaderReviewsPage$ = this.store.select(fromSelectors.processingReaderReviews);


  selectBookReviews(bookId: number, query: OrderedQuery) {
    this.store.dispatch(SELECT_BOOK_REVIEWS_PAGE({ payload: { bookId, query } }));
  }

  selectReaderReviews(readerId: number, query: OrderedQuery) {
    this.store.dispatch(SELECT_READER_REVIEWS_PAGE({ payload: { readerId, query } }))
  }

  changeOrder(query: OrderedQuery) {
    this.store.dispatch(REORDER_REVIEWS_PAGE({ payload: { query } }));
  }
}
