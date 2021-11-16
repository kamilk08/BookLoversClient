import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AddPublisherCycle } from 'src/app/modules/api/cycles/models/add-publisher-cycle.model';
import { PublisherCycleApi } from 'src/app/modules/api/cycles/publisher-cycle.api';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { AddPublisherCycleResponse } from '../../../api/cycles/responses/add-publisher-cycle.response';
import { FETCH_PUBLISHER_CYCLE } from '../publisher-cycles/publisher-cycle.actions';
import { PublisherCycleFacade } from '../publisher-cycles/publisher-cycle.facade';
import * as fromActions from './add-publisher-cycle.actions';


@Injectable()
export class AddPublisherCycleEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: PublisherCycleFacade,
    private readonly api: PublisherCycleApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {
  }

  addPublisherCycle$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PUBLISHER_CYCLE),
      switchMap(action => this.api.addPublisherCycle(new AddPublisherCycle(action.payload.publisherCycle))
        .pipe(
          switchMap((response: AddPublisherCycleResponse) => [fromActions.ADD_PUBLISHER_CYCLE_SUCCESS({ payload: { publisherCycleId: response.publisherCycleId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_PUBLISHER_CYCLE_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addPublisherCycleSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PUBLISHER_CYCLE_SUCCESS),
      withLatestFrom(this.facade.addedPublisherCycle$),
      map(stream => stream[1]),
      switchMap(cycle => [
        FETCH_PUBLISHER_CYCLE({ payload: { cycle } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Publisher cycle added sucessfully 😊' } })
      ])
    ));

  addPublisherCycleFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PUBLISHER_CYCLE_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
