import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromAddTicket from './add-ticket/add-ticket.reducer';
import * as fromTickets from './tickets/tickets.reducer';
import * as fromResolveTicket from './resolve-ticket/resolve-ticket.reducer';
import * as fromPagination from './tickets-pagination/tickets-pagination.reducer';
import * as fromWebPage from './web-page/tickets-web-page.reducer';

export interface TicketsModuleState {
  addTicket: fromAddTicket.AddTicketState,
  tickets: fromTickets.TicketsState,
  resolveTicket: fromResolveTicket.ResolveTicketState,
  pagination: fromPagination.TicketsPaginationState,
  webPage: fromWebPage.TicketsWebPageState
};

const reducersMap: ActionReducerMap<TicketsModuleState> = {
  addTicket: fromAddTicket.addTicketReducer,
  tickets: fromTickets.ticketsReducer,
  resolveTicket: fromResolveTicket.resolveTicketReducer,
  pagination: fromPagination.ticketsPaginationReducer,
  webPage: fromWebPage.ticketsWebPageReducer
};

const reducer = combineReducers(reducersMap);

export function ticketsModuleReducer(state: TicketsModuleState, action: Action) {
  return reducer(state, action);
}


export const ticketsModuleSelector = createFeatureSelector('tickets');
