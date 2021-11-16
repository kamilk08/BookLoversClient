import { ResolveTicketState } from "../resolve-ticket.reducer";

import * as fromActions from '../resolve-ticket.actions';
import * as fromReducer from '../resolve-ticket.reducer';
import { ResolveTicket } from "src/app/modules/api/tickets/models/resolve-ticket.model";
import { Decision } from "src/app/modules/api/tickets/models/decision.model";
import { UUID } from "angular2-uuid";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('RESOLVE_TICKET_REDUCER', () => {

  const initialState: ResolveTicketState = {
    model: undefined,
    processing: false,
    error: undefined
  };

  describe('RESOLVET_TICKET', () => {
    it('should return new state with processing property set to true and updated model property', () => {

      const model: ResolveTicket = new ResolveTicket(1, UUID.UUID(), UUID.UUID());
      model.decisionType = Decision.approve().value;
      model.ticketConcern = TicketConcern.author().value;

      const action = fromActions.RESOLVE_TICKET({ payload: { model } });

      const newState = fromReducer.resolveTicketReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.model).toEqual(model);
    });

  });

  describe('RESOLVE_TICKET_SUCCESS', () => {
    it('should return new state processing property set to false', () => {

      const action = fromActions.RESOLVE_TICKET_SUCCESS();

      const newState = fromReducer.resolveTicketReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });

  });

  describe('RESOLVE_TICKET_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.RESOLVE_TICKET_FALIURE({ payload: { model: error } });

      const newState = fromReducer.resolveTicketReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
