import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AddNewReview } from '../../../../api/reviews/models/add-new-reivew.model';
import { FETCH_REVIEW } from '../reviews/review.actions';
import * as fromActions from './add-review-actions';

@Injectable()
export class AddReviewEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReviewsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  addReview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_REVIEW),
      switchMap(action => this.api.addReview(new AddNewReview(action.payload.review))
        .pipe(
          switchMap((response) => [fromActions.ADD_REVIEW_SUCCESS({ payload: { reviewId: response.reviewId, review: action.payload.review } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_REVIEW_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));


  addReviewSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_REVIEW_SUCCESS),
      tap(action => action.payload.review.identification.id = action.payload.reviewId),
      map(action => action.payload.review),
      switchMap(review => [
        FETCH_REVIEW({ payload: { review } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review added successfully.😊' } })
      ])
    ));

  addReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_REVIEW_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
