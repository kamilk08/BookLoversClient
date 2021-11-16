import { createSelector } from '@ngrx/store';
import { TicketState } from 'src/app/modules/api/tickets/models/ticket-state.model';
import { ticketsModuleSelector, TicketsModuleState } from '..';
import { TicketsState } from './tickets.reducer';

const ticketsState = createSelector(ticketsModuleSelector, (state: TicketsModuleState) => state.tickets);

export const ticketById = (ticketId: number) => createSelector(ticketsState, (state: TicketsState) => {
  if (state && ticketId) {
    return state.entities[ticketId];
  }

  return undefined;
});

export const multipleTickets = (ticketIds: number[]) => createSelector(ticketsState, (state: TicketsState) => {
  if (state && ticketIds) {
    const filteredIds = state.ids.filter(f => ticketIds.includes(f));
    return filteredIds.map(id => state.entities[id]).filter(f => f !== undefined);
  }

  return undefined;
});

export const isTicketSolved = (ticketId: number) => createSelector(ticketById(ticketId), (state) => {
  if (state) return state.ticketState.value === TicketState.solved().value;

  return undefined;
})
