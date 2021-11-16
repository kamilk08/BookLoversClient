import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { StatisticsApi } from 'src/app/modules/api/ratings/statistics/statistics.api';
import * as fromActions from './publisher-statistics.actions';

@Injectable()
export class PublisherStatisticsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: StatisticsApi,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  selectPublisherStatistics$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PUBLISHER_STATISTICS),
      mergeMap(action => this.api.getPublisherStatistics(action.payload.publisherId)
        .pipe(
          switchMap(statistics => [fromActions.FETCH_PUBLISHER_STATISTICS({ payload: { statistics } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PUBLISHER_STATISTICS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ))
}
