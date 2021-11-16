import { createSelector } from "@ngrx/store";
import { ticketsModuleSelector, TicketsModuleState } from "..";
import { AddTicketState } from './add-ticket.reducer';

const addTicketState = createSelector(ticketsModuleSelector, (state: TicketsModuleState) => {
  if (state) return state.addTicket;

  return undefined;
});

export const createdTicket = createSelector(addTicketState, (state: AddTicketState) => {
  if (state) return state.ticket;

  return undefined;
});
export const creatingTicket = createSelector(addTicketState, (state: AddTicketState) => {
  if(state) return state.processing;

  return undefined;
});
