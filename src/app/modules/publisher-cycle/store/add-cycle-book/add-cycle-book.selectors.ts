import { createSelector } from "@ngrx/store";
import { PublisherCyclesModuleState, publisherCyclesState } from '..';
import { AddPublisherCycleBookState } from './add-cycle-book.reducer';

const addCycleBookState = createSelector(publisherCyclesState, (state: PublisherCyclesModuleState) => {
  if (state) return state.addCycleBook;

  return undefined;
});

export const cycleWithNewBook = createSelector(addCycleBookState, (state: AddPublisherCycleBookState) => {
  if (state) return state.publisherCycle;

  return undefined;
});
export const addedBookToCycle = createSelector(addCycleBookState, (state: AddPublisherCycleBookState) => {
  if (state) return state.book;

  return undefined;
});
export const processingCycleBook = createSelector(addCycleBookState, (state: AddPublisherCycleBookState) => {
  if (state) return state.processing;

  return undefined;
});

