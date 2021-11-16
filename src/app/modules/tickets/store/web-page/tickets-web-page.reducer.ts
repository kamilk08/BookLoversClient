import { Action, createReducer, on } from "@ngrx/store";
import { DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import { Ticket } from "../../../api/tickets/models/ticket.model";
import * as fromActions from './tickets-web-page.actions';

export interface TicketsWebPageState {
  ticketsWithState: Array<{ ticketId: number, isOpen: boolean }>
  ticketsPerPage: number,
  currentPage: number
  managedTicket: Ticket,
  includeSolvedTickets: boolean,
}

const initialState: TicketsWebPageState = {
  ticketsWithState: [],
  ticketsPerPage: undefined,
  managedTicket: undefined,
  currentPage: DEFAULT_PAGE,
  includeSolvedTickets: false,
};

const reducer = createReducer(initialState,
  on(fromActions.SET_TICKETS_COUNT_PER_PAGE, (state, action) => ({ ...state, ticketsPerPage: action.payload.count })),
  on(fromActions.SET_TICKETS_ON_PAGE, (state, action) => {
    return { ...state, ticketsWithState: action.payload.items }
  }),
  on(fromActions.SOLVE_USER_TICKET, (state, action) => ({ ...state, managedTicket: action.payload.ticket })),
  on(fromActions.TOGGLE_SELECTED_TICKET, (state, action) => {
    const manageableTickets = state.ticketsWithState;
    const index = manageableTickets.findIndex(f => f.ticketId === action.payload.ticketId);
    manageableTickets[index].isOpen = action.payload.isOpen;
    return { ...state, ticketsWithState: manageableTickets }
  }),
  on(fromActions.ACCEPT_USER_TICKET, (state, action) => ({ ...state, managedTicket: action.payload.ticket })),
  on(fromActions.DECLINE_USER_TICKET, (state, action) => ({ ...state, managedTicket: action.payload.ticket })),
  on(fromActions.INCLUDE_SOLVED_TICKETS, (state) => ({ ...state, includeSolvedTickets: true })),
  on(fromActions.EXCLUDE_SOLVED_TICKETS, (state) => ({ ...state, includeSolvedTickets: false })),
);

export function ticketsWebPageReducer(state: TicketsWebPageState, action: Action) {
  return reducer(state, action);
}


