import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ratingAction from './ratings.actions';
import { Rating } from '../../../api/ratings/models/rating.model';
import { RatingsApi } from 'src/app/modules/api/ratings/ratings.api';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

@Injectable()
export class RatingsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: RatingsApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectUserBookRating$ = createEffect(() => this.actions$.pipe(
    ofType(ratingAction.SELECT_RATING),
    mergeMap(action => this.api.getUserBookRating(action.payload.userId, action.payload.bookId)
      .pipe(
        map((rating: Rating) => ratingAction.FETCH_RATING({ payload: { rating } })),
        catchError((response: HttpErrorResponse) => of(ratingAction.FETCH_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
      ))
  ));

  selectUserRatings$ = createEffect(() => this.actions$
    .pipe(
      ofType(ratingAction.SELECT_MULTIPLE_USER_RATINGS),
      mergeMap(action => this.api.getMultipleRatings(action.payload.userId, action.payload.bookIds)
        .pipe(
          map(ratings => ratingAction.FETCH_MULTIPLE_RATINGS({ payload: { ratings } })),
          catchError((response: HttpErrorResponse) => of(ratingAction.FETCH_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        )
      )));

}
