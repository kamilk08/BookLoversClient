import { AddTicketState } from "../add-ticket.reducer";
import * as fromReducer from '../add-ticket.reducer';
import * as fromActions from '../add-ticket.actions';
import { UUID } from "angular2-uuid";
import { TicketConcern } from "src/app/modules/api/tickets/models/ticket-concern.model";
import { AddTicketModel } from "src/app/modules/api/tickets/models/add-ticket.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('ADD_TICKET_REDUCER', () => {

  const initialState: AddTicketState = {
    ticket: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_TICKET', () => {
    it('should return new state with updated ticket property and processing property set to true', () => {

      const ticketObject = { guid: UUID.UUID(), data: JSON.stringify({ data: 'data' }) };
      const ticketAddons = {
        title: `Book ticket`,
        description: 'User is trying to create a new book',
        concern: TicketConcern.book().value
      }

      const model: AddTicketModel = new AddTicketModel(ticketObject, ticketAddons);

      const action = fromActions.CREATE_TICKET({ payload: { model } });

      const newState = fromReducer.addTicketReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.ticket).toEqual(model);

    });
  });

  describe('ADD_TICKET_SUCCESS', () => {
    it('should return new state with updated ticketId property and processing set to false', () => {

      const ticketId = 1;

      const ticketObject = { guid: UUID.UUID(), data: JSON.stringify({ data: 'data' }) };
      const ticketAddons = {
        title: `Book ticket`,
        description: 'User is trying to create a new book',
        concern: TicketConcern.book().value
      }

      const model: AddTicketModel = new AddTicketModel(ticketObject, ticketAddons);

      const addTicketAction = fromActions.CREATE_TICKET({ payload: { model } });

      const addTicketState = fromReducer.addTicketReducer(initialState, addTicketAction);

      const action = fromActions.CREATE_TICKET_SUCCESS({ payload: { ticketId } });

      const newState = fromReducer.addTicketReducer(addTicketState, action);

      expect(newState.ticket.ticketId).toEqual(ticketId);
      expect(newState.processing).toBeFalsy();

    });
  });

  describe('ADD_TICKET_FALIURE', () => {
    it('should return new state with updated error property', () => {

      const error = new ApiError();

      const action = fromActions.CREATE_TICKET_FALIURE({ payload: { model: error } })

      const newState = fromReducer.addTicketReducer(initialState, action);

      expect(newState.error).toEqual(error);
    });
  });


});
