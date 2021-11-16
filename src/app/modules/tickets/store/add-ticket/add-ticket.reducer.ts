import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { AddTicketModel } from '../../../api/tickets/models/add-ticket.model';
import * as fromActions from './add-ticket.actions';

export interface AddTicketState {
  ticket: AddTicketModel,
  processing: boolean;
  error: ApiError
};

const initialState: AddTicketState = {
  ticket: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.CREATE_TICKET, (state, action) => {
    return { ...state, ticket: action.payload.model, processing: true }
  }),
  on(fromActions.CREATE_TICKET_SUCCESS, (state, action) => {
    const model = state.ticket;
    model.setTicketId(action.payload.ticketId);

    return { ...state, ticket: model, processing: false }
  }),
  on(fromActions.CREATE_TICKET_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function addTicketReducer(state: AddTicketState, action: Action) {
  return reducer(state, action);
}

