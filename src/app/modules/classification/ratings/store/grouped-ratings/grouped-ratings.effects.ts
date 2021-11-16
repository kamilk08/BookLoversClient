import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RatingsApi } from 'src/app/modules/api/ratings/ratings.api';

import * as groupedRatingAction from './grouped-ratings.actions';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GroupedRatingsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: RatingsApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectGroupedRatings$ = createEffect(() => this.actions$
    .pipe(
      ofType(groupedRatingAction.SELECT_GROUPED_RATINGS),
      mergeMap(action => this.api.getGroupedRatings(action.payload.bookId)
        .pipe(
          map(response => groupedRatingAction.FETCH_GROUPED_RATINGS({ payload: { bookId: response.bookId, groupedRatings: response.ratings } })),
          catchError((response: HttpErrorResponse) => of(groupedRatingAction.FETCH_GROUPED_RATINGS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));
}
