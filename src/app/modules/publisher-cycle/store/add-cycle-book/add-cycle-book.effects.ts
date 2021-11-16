import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './add-cycle-book.actions';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { FETCH_PUBLISHER_CYCLE } from '../publisher-cycles/publisher-cycle.actions';
import { AddCycleBook } from 'src/app/modules/api/cycles/models/add-cycle-book.model';
import { PublisherCycleApi } from 'src/app/modules/api/cycles/publisher-cycle.api';
import { PublisherCycleFacade } from '../publisher-cycles/publisher-cycle.facade';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

@Injectable()
export class AddCycleBookEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly facade: PublisherCycleFacade,
    private readonly api: PublisherCycleApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {
  }

  addCycleBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CYCLE_BOOK),
      switchMap(action => this.api.addCycleBook(new AddCycleBook(action.payload.cycle.identification.guid, action.payload.book.identification.guid))
        .pipe(
          switchMap(() => [fromActions.ADD_CYCLE_BOOK_SUCCESS({ payload: {} })]),
          catchError((response: HttpErrorResponse) => of(fromActions.ADD_CYCLE_BOOK_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  addCycleBookSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CYCLE_BOOK_SUCCESS),
      withLatestFrom(this.facade.addedBookToCycle$),
      map(stream => stream[1]),
      switchMap((cycle) => [FETCH_PUBLISHER_CYCLE({ payload: { cycle } })])
    ));

  addCycleBookFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_CYCLE_BOOK_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
