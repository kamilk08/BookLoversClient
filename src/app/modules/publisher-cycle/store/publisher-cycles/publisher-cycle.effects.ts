import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PublisherCycleApi } from 'src/app/modules/api/cycles/publisher-cycle.api';
import { PublisherCycleNotFound } from '../../models/publisher-cycle-not-found';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';

import * as fromActions from './publisher-cycle.actions';

@Injectable()
export class PublisherCycleEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: PublisherCycleApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectPublisherCycle$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_PUBLISHER_CYCLE),
      mergeMap(action => this.api.getPublisherCycleById(action.payload.id)
        .pipe(
          map(cycle => cycle !== undefined ? fromActions.FETCH_PUBLISHER_CYCLE({ payload: { cycle } })
            : fromActions.PUBLISHER_CYCLE_NOT_FOUND({ payload: { model: PublisherCycleNotFound.withId(action.payload.id) } })),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PUBLISHER_CYCLE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectMultiplePublisherCycles$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.SELECT_MULTIPLE_PUBLISHER_CYCLES),
    switchMap(action => this.api.getPublisherCycles(action.payload.ids, action.payload.query)
      .pipe(
        map(cycles => fromActions.FETCH_MULTIPLE_PUBLISHER_CYCLES({ payload: { cycles } })),
        catchError((response: HttpErrorResponse) => of(fromActions.FETCH_PUBLISHER_CYCLE_FALIURE({ payload: { error: this.adapter.adapt(response.error) } })))
      ))
  ));

  fetchPublisherCycleFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_PUBLISHER_CYCLE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })
}
