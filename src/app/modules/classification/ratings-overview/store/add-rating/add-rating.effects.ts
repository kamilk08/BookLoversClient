import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UPDATE_GROUPED_RATINGS } from '../../../ratings/store/grouped-ratings/grouped-ratings.actions';
import { FETCH_OVERVIEW } from '../../store/ratings-overview.actions';
import { RatingsOverviewFacade } from '../../store/ratings-overview.facade';
import { AddRating } from '../../../../api/ratings/models/add-rating.model';
import * as fromActions from './add-rating.actions';
import { RatingsOverviewApi } from 'src/app/modules/api/ratings/overviews/ratings-overview.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AddRatingEffects {

  constructor(private readonly actions$: Actions,
    private readonly overviewsFacade: RatingsOverviewFacade,
    private readonly api: RatingsOverviewApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  addRating$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_RATING),
      switchMap(action => this.api.addRating(new AddRating(action.payload.bookcaseGuid, action.payload.book.guid, action.payload.rating.stars))
        .pipe(
          withLatestFrom(this.overviewsFacade.singleOverview$(action.payload.book.id)),
          map(stream => { return { overview: stream[1] } }),
          switchMap((stream) => [
            fromActions.ADD_RATING_SUCCESS({ payload: { overview: stream.overview, rating: action.payload.rating } }),
            UPDATE_GROUPED_RATINGS({ payload: { bookId: stream.overview.book.bookId, oldRating: undefined, newRating: action.payload.rating.stars } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_RATING_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addRatingSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_RATING_SUCCESS),
      tap((action) => action.payload.overview.addRating(action.payload.rating)),
      map((action) => action.payload.overview),
      switchMap((overview) => [FETCH_OVERVIEW({ payload: { overview } })])
    ));

  addRatingFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_RATING_FALIURE),
      tap((action) => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false })
}
