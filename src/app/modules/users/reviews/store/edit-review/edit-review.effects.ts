import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { EditReview } from '../../../../api/reviews/models/edit-review.model';
import { UPDATE_REVIEW } from '../reviews/review.actions';
import * as fromActions from './edit-review.actions';

@Injectable()
export class EditReviewEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReviewsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  editReview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_REVIEW),
      switchMap(action => this.api.editReview(new EditReview(action.payload.review))
        .pipe(
          switchMap(() => [fromActions.EDIT_REVIEW_SUCCESS({ payload: { review: action.payload.review } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.EDIT_REVIEW_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  editReviewSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_REVIEW_SUCCESS),
      map(action => action.payload.review),
      switchMap((review) => [
        UPDATE_REVIEW({ payload: { review } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review edited successfully.😊' } })
      ])
    ));

  editReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_REVIEW_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
