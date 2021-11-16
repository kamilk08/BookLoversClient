import { TicketsState } from "../tickets.reducer";
import * as fromActions from '../tickets.actions';
import * as fromReducer from '../tickets.reducer';
import { Ticket } from "src/app/modules/api/tickets/models/ticket.model";
import { UUID } from "angular2-uuid";
import { Decision } from "src/app/modules/api/tickets/models/decision.model";
import { IssuedBy } from "src/app/modules/api/tickets/models/issued-by.model";
import { SolvedBy } from "src/app/modules/api/tickets/models/solved-by.model";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { TicketContent } from "src/app/modules/api/tickets/models/ticket-content.model";
import { TicketState } from "src/app/modules/api/tickets/models/ticket-state.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('TICKETS_REDUCER', () => {

  const initialState: TicketsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_TICKET_BY_ID', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_TICKET_BY_ID({ payload: { id: 1 } });

      const newState = fromReducer.ticketsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_TICKET', () => {
    it('should return new state with updated entities property', () => {

      const ticket: Ticket = new Ticket('title',
        new TicketContent(UUID.UUID(), 'content', TicketConcern.author().value),
        Decision.approve(), new SolvedBy(UUID.UUID()), new IssuedBy(1, UUID.UUID()), TicketState.inProgress()
      );
      ticket.setIdentification({ id: 1, guid: UUID.UUID() });

      const action = fromActions.FETCH_TICKET({ payload: { ticket } });

      const newState = fromReducer.ticketsReducer(initialState, action);

      expect(newState.entities[ticket.identification.id]).toEqual(ticket);

    });
  });

  describe('FETCH_MULTIPLE_TICKETS', () => {
    it('should return new state with updated entities property', () => {

      const ticket: Ticket = new Ticket('title',
        new TicketContent(UUID.UUID(), 'content', TicketConcern.author().value),
        Decision.approve(), new SolvedBy(UUID.UUID()), new IssuedBy(1, UUID.UUID()), TicketState.inProgress()
      );

      ticket.setIdentification({ id: 1, guid: UUID.UUID() })

      const action = fromActions.FETCH_MULTIPLE_TICKETS({ payload: { tickets: [ticket] } });

      const newState = fromReducer.ticketsReducer(initialState, action);

      expect(newState.entities[ticket.identification.id]).toEqual(ticket);
    });

    describe('FETCH_TICKTES_ERROR', () => {
      it('should return new state with defined error property', () => {

        const error = new ApiError();

        const action = fromActions.FETCH_TICKETS_ERROR({ payload: { model: error } });

        const newState = fromReducer.ticketsReducer(initialState, action);

        expect(newState.error).toEqual(error);
      })

    });

  });

})
