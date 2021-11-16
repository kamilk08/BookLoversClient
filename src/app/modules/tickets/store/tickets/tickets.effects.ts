import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { TicketsApi } from 'src/app/modules/api/tickets/tickets.api';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import * as fromActions from './tickets.actions';

@Injectable()
export class TicketEffects {

  constructor(private readonly actions$: Actions,
    private readonly api: TicketsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  selectTicket$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_TICKET_BY_ID),
      mergeMap(action => this.api.getTicketById(action.payload.id)
        .pipe(
          switchMap(ticket => [fromActions.FETCH_TICKET({ payload: { ticket } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.FETCH_TICKETS_ERROR({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  fetchTicketFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.FETCH_TICKETS_ERROR),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
