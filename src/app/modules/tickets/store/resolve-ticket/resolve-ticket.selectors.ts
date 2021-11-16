import { createSelector } from "@ngrx/store";
import { ticketsModuleSelector, TicketsModuleState } from "..";
import { ResolveTicketState } from "./resolve-ticket.reducer";

const resolveTicketState = createSelector(ticketsModuleSelector, (state: TicketsModuleState) => {
  if (state) return state.resolveTicket;

  return undefined;
})

export const resolvedTicket = createSelector(resolveTicketState, (state: ResolveTicketState) => {
  if (state) return state.model;

  return undefined;

});
export const resolvingTicket = createSelector(resolveTicketState, (state: ResolveTicketState) => {
  if (state) return state.processing;

  return undefined;
});

