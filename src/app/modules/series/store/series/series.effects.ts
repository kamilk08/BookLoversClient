import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SeriesApi } from 'src/app/modules/api/series/series.api';
import { SeriesNotFound } from '../../index/models/series-not-found';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from './series.actions';

@Injectable()
export class SeriesEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: SeriesApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_SERIES),
      mergeMap(action => this.api.getSeriesById(action.payload.id)
        .pipe(
          map(series => series !== undefined ? fromActions.FETCH_SERIES({ payload: { series: series } }) : fromActions.SERIES_NOT_FOUND({ payload: { model: SeriesNotFound.withId(action.payload.id) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SERIES_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    )
  );

  selectMultipleSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_MULTIPLE_SERIES),
      mergeMap(action => this.api.getMultipleSeries(action.payload.ids)
        .pipe(
          map(series => fromActions.FETCH_MULTIPLE_SERIES({ payload: { series: series } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SERIES_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectSeriesByBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SELECT_SERIES_BY_BOOK),
      mergeMap(action => this.api.getSeriesByBook(action.payload.bookId)
        .pipe(
          map(series => series !== undefined ? fromActions.FETCH_SERIES({ payload: { series } })
            : fromActions.SERIES_NOT_FOUND({ payload: { model: SeriesNotFound.withBookId(action.payload.bookId) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SERIES_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    )
  );

  seriesNotFound = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SERIES_NOT_FOUND),
      tap(action => this.errorActions.reactToApiError(ApiError.notFound()))
    ), { dispatch: false })

  fetchSeriesFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_SERIES_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
