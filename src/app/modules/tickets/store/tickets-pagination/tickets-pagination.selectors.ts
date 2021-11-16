import { createSelector } from "@ngrx/store";
import { ticketsModuleSelector, TicketsModuleState } from "..";
import { TicketsPaginationState } from './tickets-pagination.reducer';

const paginationState = createSelector(ticketsModuleSelector, (state: TicketsModuleState) => {
  if (state) return state.pagination;

  return undefined;
});

export const processingTicketsPage = createSelector(paginationState, (state: TicketsPaginationState) => {
  if (state) return state.processing;

  return undefined;
});

export const pageResult = createSelector(paginationState, (state: TicketsPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});

export const currentPage = createSelector(pageResult, (state) => {
  if (state) return state.page + 1;

  return undefined;
});

export const totalItems = createSelector(pageResult, (state) => {
  if (state) return state.totalItems;

  return undefined;
});

