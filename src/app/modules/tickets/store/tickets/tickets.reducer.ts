import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { fetchMany, fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import { AVALIABLE_DECISIONS } from '../../../api/tickets/models/decision.model';
import { Ticket } from '../../../api/tickets/models/ticket.model';
import * as fromActions from './tickets.actions';

export interface TicketsState {
  entities: { [id: number]: Ticket },
  ids: number[],
  processing: boolean
  error: ApiError
}

const initialState: TicketsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_TICKET_BY_ID, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.CHANGE_TICKET_STATE, (state, action) => {
    const ticket = state.entities[action.payload.ticketId] as Ticket;
    const selectedDecision = AVALIABLE_DECISIONS.find(f => f.value === action.payload.decision);
    ticket.setDecision(selectedDecision);
    ticket.markAsSolved(action.payload.librarinGuid);

    return { ...state, entities: { ...state.entities, [ticket.identification.id]: ticket } }
  }),
  on(fromActions.FETCH_TICKET, (state, action) => {
    const newState = fetchSingle((ticket: Ticket) => ticket.identification.id, state, action.payload.ticket);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_MULTIPLE_TICKETS, (state, action) => {
    const newState = fetchMany((ticket: Ticket) => ticket.identification.id, state, action.payload.tickets);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false };
  }),
  on(fromActions.FETCH_TICKETS_ERROR, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function ticketsReducer(state: TicketsState, action: Action) {
  return reducer(state, action);
}


