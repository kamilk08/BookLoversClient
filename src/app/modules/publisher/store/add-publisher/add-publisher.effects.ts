import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as fromActions from './add-publisher.actions';
import { PublisherApi } from 'src/app/modules/api/publishers/publisher.api';
import { AddPublisher } from 'src/app/modules/api/publishers/models/add-publisher.model';
import { AddPublisherResponse } from 'src/app/modules/api/publishers/responses/add-publisher.response';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { FETCH_PUBLIHSER } from '../publishers/publisher.actions';
import { PublisherFacade } from '../publishers/publisher.facade';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AddPublisherEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: PublisherFacade,
    private readonly api: PublisherApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {

  }

  addPublisher$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PUBLISHER),
      switchMap((action) => this.api.addPublisher(new AddPublisher(action.payload.publisher))
        .pipe(
          switchMap((response: AddPublisherResponse) => [fromActions.ADD_PUBLISHER_SUCCESS({ payload: { publisherId: response.publisherId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_PUBLISHER_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addPublisherSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PUBLISHER_SUCCESS),
      withLatestFrom(this.facade.addedPublisher$),
      map(stream => stream[1]),
      switchMap((publisher) => [
        FETCH_PUBLIHSER({ payload: { publisher } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Publisher added successfully.😊' } })
      ])
    ));

  addPublisherFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PUBLISHER_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
