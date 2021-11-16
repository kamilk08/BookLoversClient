import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { START_FILTERING_PUBLISHER_CYCLES, FETCH_FILTERED_PUBLISHER_CYCLES, FILTER_PUBLISHER_CYCLES_FALIURE } from './search-publisher-cycle.actions';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_MULTIPLE_PUBLISHER_CYCLES } from '../publisher-cycles/publisher-cycle.actions';
import { PublisherCycleApi } from 'src/app/modules/api/cycles/publisher-cycle.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';


@Injectable()
export class SearchPublisherCycleEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: PublisherCycleApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  startFilteringPublisherCycles$ = createEffect(() => this.actions$
    .pipe(
      ofType(START_FILTERING_PUBLISHER_CYCLES),
      switchMap(action => this.api.findPublisherCycle(action.payload.query)
        .pipe(
          switchMap((cycles) => [
            FETCH_FILTERED_PUBLISHER_CYCLES({ payload: { cycles } }),
            FETCH_MULTIPLE_PUBLISHER_CYCLES({ payload: { cycles } })]),
          catchError((response: HttpErrorResponse) => of(FILTER_PUBLISHER_CYCLES_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  filterPublisherCycleError$ = createEffect(() => this.actions$
    .pipe(
      ofType(FILTER_PUBLISHER_CYCLES_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })

}
