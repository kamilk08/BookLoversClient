import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FETCH_TICKET } from '../tickets/tickets.actions';
import { TicketsFacade } from '../tickets.facade';
import * as fromActions from './add-ticket.actions';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { TicketsApi } from 'src/app/modules/api/tickets/tickets.api';
import { MOVE_TO } from 'src/app/modules/router/state/router.actions';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';

@Injectable()
export class AddTicketEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: TicketsFacade,
    private readonly authService: AuthService,
    private readonly api: TicketsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) {
  }

  createTicket$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CREATE_TICKET),
      switchMap(action => this.api.createTicket(action.payload.model)
        .pipe(
          switchMap(response => [fromActions.CREATE_TICKET_SUCCESS({ payload: { ticketId: response.ticketId } })]),
          catchError((response: HttpErrorResponse) => of(fromActions.CREATE_TICKET_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  createTicketSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CREATE_TICKET_SUCCESS),
      withLatestFrom(this.facade.createdTicket$),
      map(stream => stream[1]),
      map(model => model.toTicket(this.authService.userId, this.authService.userGuid)),
      switchMap(ticket => [
        FETCH_TICKET({ payload: { ticket } }),
        SHOW_SUCCESS_MESSAGE({ payload: { message: 'Ticket created successfully 😊' } }),
        MOVE_TO({ payload: { moveTo: { path: ['tickets/user', this.authService.userId] } } })
      ])
    ));

  createTicketFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CREATE_TICKET_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });



}
