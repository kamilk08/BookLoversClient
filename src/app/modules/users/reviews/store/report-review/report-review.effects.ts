import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UPDATE_REVIEW } from '../reviews/review.actions';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import * as fromActions from './report-review.actions';
import { ReviewsFacade } from '../reviews/reviews.facade';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ReportReviewEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: ReviewsFacade, private readonly api: ReviewsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  reportReview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REPORT_REVIEW),
      switchMap((action) => this.api.reportReview(action.payload.reportReview)
        .pipe(
          switchMap(() => [fromActions.REPORT_REVIEW_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.REPORT_REVIEW_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  reportReviewSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REPORT_REVIEW_SUCCESS),
      withLatestFrom(this.facade.reportedReview$),
      map(stream => stream[1]),
      switchMap((review) => [
        UPDATE_REVIEW({ payload: { review } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Review reported successfully.😊' } })
      ])
    ));

  reportReviewFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REPORT_REVIEW_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
