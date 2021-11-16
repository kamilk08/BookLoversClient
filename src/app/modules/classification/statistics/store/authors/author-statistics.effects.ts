import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as fromAction from './author-statistics.actions';
import { of } from 'rxjs';
import { StatisticsApi } from 'src/app/modules/api/ratings/statistics/statistics.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthorStatisticsEffects {

  constructor(private readonly actions: Actions,
    private readonly api: StatisticsApi,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectAuthorStatistics$ = createEffect(() => this.actions
    .pipe(
      ofType(fromAction.SELECT_AUTHOR_STATISTICS),
      mergeMap(action => this.api.getAuthorStatistics(action.payload.authorId)
        .pipe(
          map(statistics => statistics !== null ? fromAction.FETCH_AUTHOR_STATISTICS({ payload: { statistics } })
            : fromAction.AUTHOR_STATISTICS_NOT_AVALIABLE()),
          catchError((response: HttpErrorResponse) => of(fromAction.FETCH_AUTHOR_STATISTICS_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));
}
