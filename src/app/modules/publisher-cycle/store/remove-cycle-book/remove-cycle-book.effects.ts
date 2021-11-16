import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './remove-cycle-book.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_PUBLISHER_CYCLE } from '../publisher-cycles/publisher-cycle.actions';
import { PublisherCycleApi } from 'src/app/modules/api/cycles/publisher-cycle.api';
import { RemoveCycleBook } from 'src/app/modules/api/cycles/models/remove-cycle-book.model';
import { PublisherCycleFacade } from '../publisher-cycles/publisher-cycle.facade';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RemoveCycleBookEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: PublisherCycleFacade,
    private readonly api: PublisherCycleApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  removeCycleBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_CYCLE_BOOK),
      switchMap(action => this.api.removeCycleBook(new RemoveCycleBook(action.payload.cycle.guid, action.payload.book.identification.guid))
        .pipe(
          switchMap(() => [fromActions.REMOVE_CYCLE_BOOK_SUCCESS({ payload: {} })]),
          catchError((response: HttpErrorResponse) => of(fromActions.REMOVE_CYCLE_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  removeCycleBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_CYCLE_BOOK_SUCCESS),
      withLatestFrom(this.facade.cylceWithRemovedBook$),
      map(stream => stream[1]),
      switchMap((cycle) => [
        FETCH_PUBLISHER_CYCLE({ payload: { cycle } })
      ])
    ));

  removeCycleBookFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_CYCLE_BOOK_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });
}
