import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { DEFAULT_ITEMS_COUNT, DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { REVIEWS_QUERY } from "src/app/modules/users/reviews/models/reviews.query";
import { ReviewsPaginationFacade } from "src/app/modules/users/reviews/store/reviews-pagination.facade";
import { BooksPaginationFacade } from "../pagination/books-pagination.facade";
import * as fromActions from './book-webpage.actions';
import { BookWebPageFacade } from "./book-webpage.facade";

@Injectable()
export class BookWebPageEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly pageFacade: BookWebPageFacade,
    private readonly reviewsPagination: ReviewsPaginationFacade,
    private readonly booksPagination: BooksPaginationFacade
  ) {
  }

  changeReviewsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_REVIEWS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.sortType$, this.pageFacade.descending$, this.pageFacade.bookId$),
      map(stream => { return { page: stream[0], sortType: stream[1], descending: stream[2], bookId: stream[3] } }),
      map(stream => { return { bookId: stream.bookId, query: REVIEWS_QUERY(stream.page, stream.descending, stream.sortType, DEFAULT_ITEMS_COUNT) } }),
      tap(stream => this.reviewsPagination.selectBookReviews(stream.bookId, stream.query))
    ), { dispatch: false });

  changeReviewsSortType$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_REVIEWS_SORT_TYPE),
      map(action => action.payload.sortType),
      withLatestFrom(this.pageFacade.descending$, this.booksPagination.currentPage$, this.pageFacade.bookId$),
      map(stream => { return { sortType: stream[0], descending: stream[1], currentPage: stream[2], bookId: stream[3] } }),
      map(stream => { return { bookId: stream.bookId, query: REVIEWS_QUERY(stream.currentPage, stream.descending, stream.sortType) } }),
      tap(stream => this.reviewsPagination.selectBookReviews(stream.bookId, stream.query))
    ), { dispatch: false });

  changeReviewsOrder$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_REVIEWS_SORT_ORDER),
      map(action => action.payload.descending),
      withLatestFrom(this.pageFacade.sortType$, this.booksPagination.currentPage$, this.pageFacade.bookId$),
      map(stream => { return { descending: stream[0], sortType: stream[1], currentPage: stream[2], bookId: stream[3] } }),
      map(stream => { return { bookId: stream.bookId, query: REVIEWS_QUERY(stream.currentPage, stream.descending, stream.sortType) } }),
      tap(stream => this.reviewsPagination.selectBookReviews(stream.bookId, stream.query))
    ), { dispatch: false })
}
