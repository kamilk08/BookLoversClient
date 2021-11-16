import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { TicketsApi } from "src/app/modules/api/tickets/tickets.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { CHANGE_TICKET_STATE } from "../../store/tickets/tickets.actions";
import * as fromActions from './resolve-ticket.actions';

@Injectable()
export class ResolveTicketEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly api: TicketsApi,
    private readonly errorActions: ErrorActions,
    private readonly adapter: ApiErrorAdapter
  ) { }

  resolveTicket$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RESOLVE_TICKET),
      switchMap(action => this.api.solveTicket(action.payload.model)
        .pipe(
          switchMap(() => [fromActions.RESOLVE_TICKET_SUCCESS(),
          CHANGE_TICKET_STATE({
            payload: {
              ticketId: action.payload.model.ticketId,
              decision: action.payload.model.decisionType,
              librarinGuid: action.payload.model.librarianGuid
            }
          })]),
          catchError((response: HttpErrorResponse) => of(fromActions.RESOLVE_TICKET_FALIURE({ payload: { model: this.adapter.adapt(response.error) } })))
        ))
    ));

  resolveTicketSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RESOLVE_TICKET_SUCCESS),
      switchMap(() => [SHOW_SUCCESS_MESSAGE({ payload: { message: 'Ticket resolved successfully 😊' } })])
    ));

  resolveTicketFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RESOLVE_TICKET_FALIURE),
      tap(action => this.errorActions.reactToApiError(action.payload.model))
    ), { dispatch: false });

}
