import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { RemoveRating } from 'src/app/modules/api/ratings/models/remove-rating.model';
import { RatingsOverviewApi } from 'src/app/modules/api/ratings/overviews/ratings-overview.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { UPDATE_GROUPED_RATINGS } from '../../../ratings/store/grouped-ratings/grouped-ratings.actions';
import { FETCH_OVERVIEW } from '../../store/ratings-overview.actions';
import { RatingsOverviewFacade } from '../../store/ratings-overview.facade';
import * as fromActions from './remove-rating.actions';

@Injectable()
export class RemoveRatingEffects {

  constructor(private readonly actions$: Actions,
    private readonly overviewFacade: RatingsOverviewFacade,
    private readonly api: RatingsOverviewApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  removeRating$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_RATING),
      switchMap(action => this.api.removeRating(new RemoveRating(action.payload.book.guid))
        .pipe(
          withLatestFrom(this.overviewFacade.singleOverview$(action.payload.book.id)),
          map(stream => { return { overview: stream[1] } }),
          switchMap((stream) => [
            UPDATE_GROUPED_RATINGS({
              payload: {
                bookId: action.payload.book.id, oldRating: stream.overview.getUserRating(action.payload.userId).stars,
                newRating: undefined
              }
            }),
            fromActions.REMOVE_RATING_SUCCESS({
              payload: {
                overview: stream.overview, userId: action.payload.userId,
                removedRating: stream.overview.getUserRating(action.payload.userId)
              }
            }),
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_RATING_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ))

  removeRatingSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_RATING_SUCCESS),
      tap(action => action.payload.overview.removeRating(action.payload.removedRating)),
      map(action => action.payload.overview),
      switchMap((overview) => [FETCH_OVERVIEW({ payload: { overview } })])
    ));


  removeRatingFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_RATING_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
