import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { SeriesApi } from 'src/app/modules/api/series/series.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AddSeries } from '../../../api/series/models/add-series.model';
import { FETCH_SERIES } from '../series/series.actions';
import { SeriesFacade } from '../series/series.facade';
import * as fromActions from './add-series.actions';

@Injectable()
export class AddSeriesEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: SeriesFacade,
    private readonly api: SeriesApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  addSeries$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_SERIES),
      mergeMap(action => this.api.addSeries(new AddSeries(action.payload.series))
        .pipe(
          switchMap(response => [fromActions.ADD_SERIES_SUCCESS({ payload: { seriesId: response.seriesId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_SERIES_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addSeriesSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_SERIES_SUCCESS),
      withLatestFrom(this.facade.addedSeries$),
      map(stream => stream[1]),
      switchMap(series => [
        FETCH_SERIES({ payload: { series: series } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Series added successfully.😊' } })
      ])
    ));

  addSeriesFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_SERIES_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
