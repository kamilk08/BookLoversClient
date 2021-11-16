import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReaderStatisticsApi } from 'src/app/modules/api/statistics/statistics.api';
import * as fromActions from './reader-statistics.actions';

@Injectable()
export class ReaderStatisticsEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: ReaderStatisticsApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectReaderStatistics$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_READER_STATISTICS),
      mergeMap(action => this.api.getReaderStatistics(action.payload.readerId)
        .pipe(
          switchMap((statistics) => [fromActions.FETCH_READER_STATISTICS({ payload: { statistics } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_READER_STATISTICS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ))
}
