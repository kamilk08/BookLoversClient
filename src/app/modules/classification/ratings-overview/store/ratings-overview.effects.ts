import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './ratings-overview.actions';
import { RatingsOverviewApi } from 'src/app/modules/api/ratings/overviews/ratings-overview.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RatingOverviewEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: RatingsOverviewApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectRatingsOverview$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_RATINGS_OVEREVIEW),
      mergeMap(action => this.api.getOverview(action.payload.bookId)
        .pipe(
          map(overview => fromActions.FETCH_OVERVIEW({ payload: { overview } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_OVERVIEW_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectMultipleOverviews$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_MULTIPLE_OVERVIEWS),
      switchMap(action => this.api.getMultipleOverviews(action.payload.bookIds)
        .pipe(
          map(overviews => fromActions.FETCH_MULTIPLE_OVERVIEWS({ payload: { overviews } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_OVERVIEW_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

}
