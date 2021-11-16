import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, switchMap, catchError } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';
import { FETCH_MANY_REVIEWS } from '../reviews/review.actions';
import * as fromActions from './reader-reviews-pagination.actions';

@Injectable()
export class ReaderReviewsPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReviewsApi,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  selectReaderReviewsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_REVIEWS_PAGE),
      switchMap(action => this.api.getReaderReviews(action.payload.readerId, action.payload.query)
        .pipe(
          switchMap(response => [
            fromActions.SET_READER_REVIEWS_PAGE({
              payload: {
                readerId: action.payload.readerId,
                pageResult: response.pageResult
              }
            }),
            FETCH_MANY_REVIEWS({ payload: { reviews: response.pageResult.items } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REVIEWS_PAGE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  setReaderReviewsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_READER_REVIEWS_PAGE),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.READER_REVIEWS_PAGE_SELECTED()])
    ))

}
