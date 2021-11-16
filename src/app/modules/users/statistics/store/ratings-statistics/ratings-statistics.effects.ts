import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReaderStatisticsApi } from '../../../../api/statistics/statistics.api';
import * as fromActions from './ratings-statistics.actions';

@Injectable()
export class ReaderRatingsStatisticsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: ReaderStatisticsApi,
    private readonly adapter: ApiErrorAdapter) {
  }

  selectReaderRatings$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_RATINGS_STATISTICS),
      switchMap(action => this.api.getReaderRatingsStatistics(action.payload.readerId)
        .pipe(
          switchMap((statistics) => [fromActions.FETCH_READER_RATINGS_STATISTICS({ payload: { statistics } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_READER_RATINGS_STATISTICS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

}
