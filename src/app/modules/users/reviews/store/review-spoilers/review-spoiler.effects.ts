import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UPDATE_REVIEW } from '../reviews/review.actions';
import { ReviewsFacade } from '../reviews/reviews.facade';
import { ReviewsApi } from 'src/app/modules/api/reviews/reviews.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

import * as fromActions from './review-spoiler.actions';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ReviewSpoilerEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: ReviewsFacade,
    private readonly api: ReviewsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  addSpoilerTag$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_SPOILER_TAG),
      switchMap(action => this.api.addSpoilerTag(action.payload.review.identification.guid)
        .pipe(
          switchMap(() => [fromActions.ADD_SPOILER_TAG_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_SPOILER_TAG_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addSpoilerTagSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_SPOILER_TAG_SUCCESS),
      withLatestFrom(this.facade.reviewSpoiler$),
      map(stream => stream[1]),
      switchMap(review => [UPDATE_REVIEW({ payload: { review } })])
    ));

  addSpoilerTagFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_SPOILER_TAG_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });


  removeSpoilerTag$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_SPOILER_TAG),
      switchMap(action => this.api.removeSpoilerTag(action.payload.review.identification.guid)
        .pipe(
          switchMap(() => [fromActions.REMOVE_SPOILER_TAG_SUCCESS()]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_SPOILER_TAG_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ))

  removeSpoilerTagSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_SPOILER_TAG_SUCCESS),
      withLatestFrom(this.facade.reviewSpoiler$),
      map(stream => stream[1]),
      switchMap(review => [UPDATE_REVIEW({ payload: { review } })])
    ));

  removeSpoilerTagFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_SPOILER_TAG_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
