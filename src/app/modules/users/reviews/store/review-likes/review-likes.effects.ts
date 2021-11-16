import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UPDATE_REVIEW } from '../reviews/review.actions';
import * as fromActions from './review-likes.actions';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { ReviewsFacade } from '../reviews/reviews.facade';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

@Injectable()
export class ReviewLikesEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: ReviewsFacade,
    private readonly api: ReviewsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  likeReview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LIKE_REVIEW),
      switchMap(action => this.api.likeReview(action.payload.review.identification.guid)
        .pipe(
          switchMap(() => [fromActions.LIKE_REVIEW_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.LIKE_REVIEW_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  likeReviewSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LIKE_REVIEW_SUCCESS),
      withLatestFrom(this.facade.likedReview$),
      map(stream => stream[1]),
      switchMap((review) => [
        UPDATE_REVIEW({ payload: { review } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review liked successfully.😊' } })
      ])
    ));

  likeReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LIKE_REVIEW_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });


  unlikeReview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNLIKE_REVIEW),
      switchMap(action => this.api.unlikeReview(action.payload.review.identification.guid)
        .pipe(
          switchMap(() => [fromActions.UNLIKE_REVIEW_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.UNLIKE_REVIEW_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  unLikeReviewSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNLIKE_REVIEW_SUCCESS),
      withLatestFrom(this.facade.unlikedReview$),
      map(stream => stream[1]),
      switchMap((review) => [
        UPDATE_REVIEW({ payload: { review } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review unliked successfully.😊' } })
      ])
    ));

  unLikeReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.UNLIKE_REVIEW_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
