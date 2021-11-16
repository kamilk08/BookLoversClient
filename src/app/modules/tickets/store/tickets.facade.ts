import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Query } from '../../shared/common/query';
import { AddTicketModel } from '../../api/tickets/models/add-ticket.model';
import { ResolveTicket } from '../../api/tickets/models/resolve-ticket.model';
import { CREATE_TICKET } from './add-ticket/add-ticket.actions';
import { RESOLVE_TICKET } from './resolve-ticket/resolve-ticket.actions';
import { SELECT_MANAGEABLE_TICKETS_PAGE, SELECT_USER_TICKETS_PAGE } from './tickets-pagination/tickets-pagination.actions';
import { SELECT_TICKET_BY_ID } from './tickets/tickets.actions';
import * as fromModule from './index';
import * as fromSelectors from './module.selectors';


@Injectable()
export class TicketsFacade {

  public readonly ticketById$ = (ticketId: number) => this.store.select(fromSelectors.ticketById(ticketId));
  public readonly multipleTickets$ = (ticketIds: number[]) => this.store.select(fromSelectors.multipleTickets(ticketIds));

  public readonly isTicketSolved$ = (ticketId) => this.store.select(fromSelectors.isTicketSolved(ticketId));

  public readonly createdTicket$ = this.store.select(fromSelectors.createdTicket);
  public readonly creatingTicket$ = this.store.select(fromSelectors.creatingTicket);

  public readonly resolvedTicket$ = this.store.select(fromSelectors.resolvedTicket);
  public readonly resolvingTicket$ = this.store.select(fromSelectors.resolvingTicket);

  public readonly pageResult$ = this.store.select(fromSelectors.pageResult);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);
  public readonly totalItems$ = this.store.select(fromSelectors.totalItems);
  public readonly processingTicketsPage$ = this.store.select(fromSelectors.processingTicketsPage);

  constructor(private store: Store<fromModule.TicketsModuleState>) { }

  selectTicket(ticketId: number) {
    this.store.dispatch(SELECT_TICKET_BY_ID({ payload: { id: ticketId } }));
  }

  selectUserTickets(query: Query, solved: boolean) {
    this.store.dispatch(SELECT_USER_TICKETS_PAGE({ payload: { query, solved } }))
  }

  selectManageableTickets(query: Query, solved: boolean) {
    this.store.dispatch(SELECT_MANAGEABLE_TICKETS_PAGE({ payload: { query, solved } }));
  }

  createTicket(model: AddTicketModel) {
    this.store.dispatch(CREATE_TICKET({ payload: { model } }));
  }

  resolveTicket(model: ResolveTicket) {
    this.store.dispatch(RESOLVE_TICKET({ payload: { model } }));
  }


}
