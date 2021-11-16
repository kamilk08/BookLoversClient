import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, switchMap, catchError, delay, tap } from "rxjs/operators";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { DEFAULT_DELAY } from "src/app/modules/shared/common/constants";

import * as fromActions from './series-books.actions';

@Injectable()
export class SeriesBooksEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: SeriesApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) {

  }

  selectSeriesBooks$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_SERIES_BOOKS),
      mergeMap(action => this.api.getSeriesBooks(action.payload.query)
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap(pageResult => [
            fromActions.FETCH_SERIES_BOOKS({ payload: { pageResult } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_SERIES_BOOKS_ERROR({ payload: { error: this.adapter.adapt(response.error) } }))),
        )),
    ));

  errorActions$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_SERIES_BOOKS_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
