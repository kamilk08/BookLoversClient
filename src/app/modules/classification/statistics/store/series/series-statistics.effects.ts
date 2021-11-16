import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './series-statistics.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { StatisticsApi } from 'src/app/modules/api/ratings/statistics/statistics.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SeriesStatisticsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: StatisticsApi,
    private readonly adapter: ApiErrorAdapter
  ) {

  }
  selectSeriesStatistics$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_SERIES_STATISTICS),
      mergeMap(action => this.api.getSeriesStatistics(action.payload.id)
        .pipe(
          map(statistics => fromActions.FETCH_SERIES_STATISTICS({ payload: { statistics } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SERIES_STATISTICS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectMultipleSeriesStatistics$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_MULTIPLE_SERIES_STATISTICS),
      mergeMap(action => this.api.getMultipleSeriesStatistics(action.payload.ids)
        .pipe(
          map(statistics => fromActions.FETCH_MULTIPLE_SERIES_STATISTICS({ payload: { statistics } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SERIES_STATISTICS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));
}
