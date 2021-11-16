import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Ticket } from "../../../api/tickets/models/ticket.model";
import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';
import { EXCLUDE_SOLVED_TICKETS, INCLUDE_SOLVED_TICKETS, SET_TICKETS_COUNT_PER_PAGE, SET_TICKETS_ON_PAGE, TOGGLE_SELECTED_TICKET, SOLVE_USER_TICKET, SELECT_TICKETS_ACCORDING_TO_USER, CHANGE_TICKETS_PAGE } from "./tickets-web-page.actions";

@Injectable()
export class TicketsWebPageFacade {

  public readonly ticketsPerPage$ = this.store.select(fromSelectors.ticketsPerPage);
  public readonly currentTickets$ = this.store.select(fromSelectors.currentTickets);
  public readonly solvedTickets$ = this.store.select(fromSelectors.solvedTickets);

  public readonly ticketState$ = (ticketId: number) => this.store.select(fromSelectors.ticketState(ticketId));

  constructor(private store: Store<fromModule.TicketsModuleState>) { }

  setTicketsCountPerPage(count: number) {
    this.store.dispatch(SET_TICKETS_COUNT_PER_PAGE({ payload: { count } }));
  }

  setTicketsToManage(tickets: Ticket[]) {
    const items = tickets.map(ticket => ({ ticketId: ticket.identification.id, isOpen: false }));

    this.store.dispatch(SET_TICKETS_ON_PAGE({ payload: { items } }))
  }

  changeTicketsPage(page: number) {
    this.store.dispatch(CHANGE_TICKETS_PAGE({ payload: { page } }));
  }

  selectTicketsAccordingToUser() {
    this.store.dispatch(SELECT_TICKETS_ACCORDING_TO_USER());
  }

  includeSolvedTickets() {
    this.store.dispatch(INCLUDE_SOLVED_TICKETS());
  }

  excludeSolvedTickets() {
    this.store.dispatch(EXCLUDE_SOLVED_TICKETS());
  }

  solveTicket(ticket: Ticket, isAccepted: boolean) {
    this.store.dispatch(SOLVE_USER_TICKET({ payload: { ticket, isAccepted } }))
  }

  toggleTicket(ticketId: number, isOpen: boolean) {
    this.store.dispatch(TOGGLE_SELECTED_TICKET({ payload: { ticketId, isOpen } }))
  }

}
