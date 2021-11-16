import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../book-reviews/reviews-pagination.actions';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { FETCH_MANY_REVIEWS } from '../reviews/review.actions';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class BookReviewsPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReviewsApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectBookReviewsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_BOOK_REVIEWS_PAGE),
      switchMap(action => this.api.getBookReviews(action.payload.bookId, action.payload.query)
        .pipe(
          switchMap(response => [
            FETCH_MANY_REVIEWS({ payload: { reviews: response.pageResult.items } }),
            fromActions.SET_BOOK_REVIEWS_PAGE({ payload: { pageResult: response.pageResult } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REVIEWS_PAGE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  reviewsPageFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REVIEWS_PAGE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
