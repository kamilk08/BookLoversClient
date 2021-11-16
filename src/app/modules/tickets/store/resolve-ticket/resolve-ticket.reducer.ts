import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ResolveTicket } from "../../../api/tickets/models/resolve-ticket.model";
import * as fromActions from './resolve-ticket.actions';

export interface ResolveTicketState {
  model: ResolveTicket,
  processing: boolean,
  error: ApiError
};

const initialState: ResolveTicketState = {
  model: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.RESOLVE_TICKET, (state, action) => {
    return { ...state, model: action.payload.model, processing: true }
  }),
  on(fromActions.RESOLVE_TICKET_SUCCESS, (state) => {
    return { ...state, processing: false }
  }),
  on(fromActions.RESOLVE_TICKET_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function resolveTicketReducer(state: ResolveTicketState, action: Action) {
  return reducer(state, action);
}
