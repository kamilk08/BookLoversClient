import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { TicketsApi } from 'src/app/modules/api/tickets/tickets.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { DEFAULT_DELAY } from 'src/app/modules/shared/common/constants';
import { FETCH_MULTIPLE_TICKETS } from '../../store/tickets/tickets.actions';
import * as fromActions from './tickets-pagination.actions';

@Injectable()
export class TicketsPaginationEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: TicketsApi,
    private readonly adapter: ApiErrorAdapter,
    private readonly errorActions: ErrorActions
  ) { }

  selectUserTickets$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_USER_TICKETS_PAGE),
      switchMap(action => this.api.searchUserTickets(action.payload.query, action.payload.solved)
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap(pageResult => [
            fromActions.FETCH_TICKETS_PAGE({ payload: { pageResult } }),
            FETCH_MULTIPLE_TICKETS({ payload: { tickets: pageResult.items } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.TICKETS_PAGE_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  selectManageableTickets$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_MANAGEABLE_TICKETS_PAGE),
      mergeMap(action => this.api.getManageableTickets(action.payload.query, action.payload.solved)
        .pipe(
          delay(DEFAULT_DELAY),
          switchMap(pageResult => [
            fromActions.FETCH_TICKETS_PAGE({ payload: { pageResult } }),
            FETCH_MULTIPLE_TICKETS({ payload: { tickets: pageResult.items } })
          ]),
          catchError((response: HttpErrorResponse) => of(fromActions.TICKETS_PAGE_ERROR({ payload: { error: this.adapter.adapt(response.error) } })))
        ))
    ));

  ticketsPageError$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.TICKETS_PAGE_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.error))
    ), { dispatch: false })


}
