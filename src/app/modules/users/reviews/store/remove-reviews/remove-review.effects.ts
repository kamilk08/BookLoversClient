import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { REMOVE_FROM_CURRENT_REVIEWS } from '../reviews/review.actions';
import * as fromActions from './remove-review.actions';

@Injectable()
export class RemoveReviewEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReviewsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  removeReview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_REVIEW),
      switchMap(action => this.api.removeReview(action.payload.review.identification.guid)
        .pipe(
          switchMap(() => [fromActions.REMOVE_REVIEW_SUCCESS({ payload: { review: action.payload.review } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_REVIEW_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeReviewSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_REVIEW_SUCCESS),
      switchMap((action) => [
        REMOVE_FROM_CURRENT_REVIEWS({ payload: { review: action.payload.review } })
      ])
    ));

  removeReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_REVIEW_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
