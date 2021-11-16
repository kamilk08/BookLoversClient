import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { delay, map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from './search-series.actions';
import { SeriesApi } from 'src/app/modules/api/series/series.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';

@Injectable()
export class SearchSeriesEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: SeriesApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  startFilteringBookSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.START_FILTERING_SERIES),
      mergeMap(action => this.api.findSeries(action.payload.query)
        .pipe(
          map(series => series !== undefined ? fromActions.FETCH_FILTERED_SERIES({ payload: { series } }) : fromActions.SERIES_FILTERED()),
          catchError((response: HttpErrorResponse) => of(fromActions.FILTER_SERIES_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    )
  );

  filterSeriesFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FILTER_SERIES_FALIURE),
      switchMap(() => [fromActions.STOP_FILTERING_SERIES()])
    ));


  fetchFilteredSeries$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_FILTERED_SERIES),
      switchMap(() => [fromActions.SERIES_FILTERED()])
    ));

  seriesFiltered$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SERIES_FILTERED),
      delay(DEFAULT_DELAY),
      switchMap(() => [fromActions.STOP_FILTERING_SERIES()])
    ));
}
