import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { delay, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { SeriesApi } from 'src/app/modules/api/series/series.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { DEFAULT_DEBOUNCE } from 'src/app/modules/shared/common/constants';
import { FETCH_MULTIPLE_SERIES, FETCH_SERIES_FALIURE } from '../series/series.actions';
import * as fromActions from './series-pagination.actions';

@Injectable()
export class SeriesPaginationEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: SeriesApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectSeriesByAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_SERIES_BY_AUTHOR),
      mergeMap(action => this.api.getSeriesByAuthor(action.payload.authorId, action.payload.query)
        .pipe(
          switchMap(response => [
            FETCH_MULTIPLE_SERIES({ payload: { series: response.series } }),
            fromActions.SET_SERIES_PAGE({ payload: { series: response.series, pageResult: response.pageResult } })]),
          catchError((response: HttpErrorResponse) => of(FETCH_SERIES_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  setSeriesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SERIES_PAGE),
      delay(DEFAULT_DEBOUNCE),
      switchMap(() => [fromActions.SERIES_PAGE_SELECTED()])
    ));

  fetchSeriesFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SERIES_PAGE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
