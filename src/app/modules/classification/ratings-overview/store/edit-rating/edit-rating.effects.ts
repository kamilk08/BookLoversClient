import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { EditRating } from 'src/app/modules/api/ratings/models/edit-rating.model';
import { RatingsOverviewApi } from 'src/app/modules/api/ratings/overviews/ratings-overview.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { UPDATE_GROUPED_RATINGS } from '../../../ratings/store/grouped-ratings/grouped-ratings.actions';
import { FETCH_OVERVIEW } from '../../store/ratings-overview.actions';
import { RatingsOverviewFacade } from '../../store/ratings-overview.facade';
import * as fromActions from './edit-rating.actions';


@Injectable()
export class EditRatingEffects {

  constructor(private readonly actions$: Actions,
    private readonly ratingsOverview: RatingsOverviewFacade,
    private readonly api: RatingsOverviewApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {
  }

  changeRating$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_RATING),
      switchMap(action => this.api.editRating(new EditRating(action.payload.book.guid, action.payload.newRating.stars))
        .pipe(
          withLatestFrom(this.ratingsOverview.singleOverview$(action.payload.book.id)),
          map(stream => { return { overview: stream[1], userId: action.payload.newRating.userId, newRating: action.payload.newRating } }),
          switchMap((stream) => [
            UPDATE_GROUPED_RATINGS({
              payload: {
                bookId: stream.overview.book.bookId,
                oldRating: stream.overview.getUserRating(stream.userId).stars,
                newRating: stream.newRating.stars
              }
            }),
            fromActions.EDIT_RATING_SUCCESS({
              payload: {
                overview: stream.overview,
                userId: stream.userId,
                newRating: stream.newRating,
                oldRating: stream.overview.getUserRating(stream.userId)
              }
            })]),
          catchError((response: HttpErrorResponse) => of(fromActions.EDIT_RATING_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ),
      ),
    ));

  changeRatingSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_RATING_SUCCESS),
      tap(stream => stream.payload.overview.changeRating(stream.payload.userId, stream.payload.newRating.stars)),
      map(stream => stream.payload.overview),
      switchMap((overview) => [FETCH_OVERVIEW({ payload: { overview } })])
    ));

  changeRatingFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EDIT_RATING_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })

}
