import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as fromActions from './review.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

@Injectable()
export class ReviewsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReviewsApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectUserReview$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.SELECT_REVIEW),
    switchMap((action) => this.api.getUserReview(action.payload.readerId, action.payload.bookId)
      .pipe(
        map((review) => {
          return review ? fromActions.FETCH_REVIEW({ payload: { review } })
            : fromActions.REVIEW_ACTION_SUCCESS()
        }),
        catchError((response: HttpErrorResponse) => of(fromActions.FETCH_REVIEW_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
      ))
  ));

  fetchReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_REVIEW_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
