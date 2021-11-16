import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { DEFAULT_PAGE, DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { TicketsFacade } from "../tickets.facade";
import { TicketsWebPageFacade } from "./tickets-web-page.facade";
import * as fromActions from '../web-page/tickets-web-page.actions';
import { LibrariansFacade } from "src/app/modules/librarians/store/librarians.facade";
import { ResolveTicketBuilder } from "../tickets/resolve-ticket.builder";
import { Decision } from "../../../api/tickets/models/decision.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable()
export class TicketsWebPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly pageFacade: TicketsWebPageFacade,
    private readonly ticketsFacade: TicketsFacade,
    private readonly librariansFacade: LibrariansFacade,
    private readonly authService: AuthService,
    private readonly builder: ResolveTicketBuilder
  ) { }

  includeSolvedTickets$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.INCLUDE_SOLVED_TICKETS),
      withLatestFrom(this.pageFacade.solvedTickets$, this.pageFacade.ticketsPerPage$),
      map(stream => ({ flag: stream[1], ticketsPerPage: stream[2] })),
      tap((stream) => this.authService.isLibrarian ?
        this.ticketsFacade.selectManageableTickets(DEFAULT_QUERY(DEFAULT_PAGE, stream.ticketsPerPage), stream.flag)
        : this.ticketsFacade.selectUserTickets(DEFAULT_QUERY(DEFAULT_PAGE, stream.ticketsPerPage), stream.flag))
    ), { dispatch: false });

  excludeSolvedTickets$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.EXCLUDE_SOLVED_TICKETS),
      withLatestFrom(this.pageFacade.solvedTickets$, this.pageFacade.ticketsPerPage$),
      map(stream => ({ flag: stream[1], ticketsPerPage: stream[2] })),
      tap((stream) => this.authService.isLibrarian ?
        this.ticketsFacade.selectManageableTickets(DEFAULT_QUERY(), stream.flag) : this.ticketsFacade.selectUserTickets(DEFAULT_QUERY(), stream.flag))
    ), { dispatch: false });

  selectTicketsAccordingToUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_TICKETS_ACCORDING_TO_USER),
      map(() => this.authService.isLibrarian),
      switchMap((isLibrarian) => [isLibrarian ? fromActions.SELECT_TICKETS_TO_SOLVE() : fromActions.SELECT_USER_TICKETS()])
    ));

  changeTicketsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_TICKETS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.solvedTickets$, this.pageFacade.ticketsPerPage$),
      map(stream => ({ page: stream[0], solved: stream[1], ticketsPerPage: stream[2] })),
      tap(stream => this.authService.isLibrarian ?
        this.ticketsFacade.selectManageableTickets(DEFAULT_QUERY(stream.page, stream.ticketsPerPage), stream.solved)
        : this.ticketsFacade.selectUserTickets(DEFAULT_QUERY(stream.page, stream.ticketsPerPage), stream.solved))
    ), { dispatch: false })

  selectTicketsToSolve$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_TICKETS_TO_SOLVE),
      withLatestFrom(this.pageFacade.solvedTickets$, this.pageFacade.ticketsPerPage$),
      map(stream => ({ solved: stream[1], ticketsPerPage: stream[2] })),
      tap(() => this.librariansFacade.selectLibrarianByReaderGuid(this.authService.userGuid)),
      tap((stream) => this.ticketsFacade.selectManageableTickets(DEFAULT_QUERY(DEFAULT_PAGE, stream.ticketsPerPage), stream.solved)),
    ), { dispatch: false });

  selectUserTickets$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_USER_TICKETS),
      withLatestFrom(this.pageFacade.solvedTickets$, this.pageFacade.ticketsPerPage$),
      map(stream => ({ solved: stream[1], ticketsPerPage: stream[2] })),
      tap((stream) => this.ticketsFacade.selectUserTickets(DEFAULT_QUERY(DEFAULT_PAGE, stream.ticketsPerPage), stream.solved)),
    ), { dispatch: false });

  solveUserTicket$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SOLVE_USER_TICKET),
      switchMap((action) => [action.payload.isAccepted ?
        fromActions.ACCEPT_USER_TICKET({ payload: { ticket: action.payload.ticket } })
        : fromActions.DECLINE_USER_TICKET({ payload: { ticket: action.payload.ticket } })])
    ));

  ticketAccepted$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ACCEPT_USER_TICKET),
      map(action => action.payload.ticket),
      withLatestFrom(this.librariansFacade.librarianByReaderGuid$(this.authService.userGuid)),
      map(stream => ({ ticket: stream[0], librarian: stream[1] })),
      map((stream) => {
        return this.builder
          .initialize(stream.ticket, stream.librarian.identification.guid)
          .setDecision(Decision.approve())
          .setTicketConcern(stream.ticket.data.ticketConcern)
          .setJustification('Correct ticket')
          .getResolveModel();
      }),
      tap(ticket => this.ticketsFacade.resolveTicket(ticket))
    ), { dispatch: false });

  ticketDeclined$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.DECLINE_USER_TICKET),
      map(action => action.payload.ticket),
      withLatestFrom(this.librariansFacade.librarianByReaderGuid$(this.authService.userGuid)),
      map(stream => ({ ticket: stream[0], librarian: stream[1] })),
      map((stream) => {
        return this.builder
          .initialize(stream.ticket, stream.librarian.identification.guid)
          .setDecision(Decision.decline())
          .setTicketConcern(stream.ticket.data.ticketConcern)
          .setJustification('Invalid ticket')
          .getResolveModel();
      }),
      tap(resolveModel => this.ticketsFacade.resolveTicket(resolveModel)),
    ), { dispatch: false })

}
