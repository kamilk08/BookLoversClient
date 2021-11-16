import { createSelector } from "@ngrx/store";
import { ticketsModuleSelector, TicketsModuleState } from "..";
import { TicketsWebPageState } from "./tickets-web-page.reducer";

const webPageState = createSelector(ticketsModuleSelector, (state: TicketsModuleState) => {
  if (state) return state.webPage;

  return undefined;
});

export const currentTickets = createSelector(webPageState, (state: TicketsWebPageState) => {
  if (state) return state.ticketsWithState;

  return undefined;
});
export const ticketsPerPage = createSelector(webPageState, (state: TicketsWebPageState) => {
  if (state) return state.ticketsPerPage;

  return undefined;
});

export const solvedTickets = createSelector(webPageState, (state: TicketsWebPageState) => {
  if (state) return state.includeSolvedTickets;

  return undefined;
});

export const ticketState = (ticketId: number) => createSelector(webPageState, (state: TicketsWebPageState) => {
  if (state) {
    return state.ticketsWithState.find(f => f.ticketId === ticketId);
  }

  return undefined;
})
