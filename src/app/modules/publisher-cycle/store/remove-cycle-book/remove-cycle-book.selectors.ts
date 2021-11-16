import { createSelector } from "@ngrx/store";
import { PublisherCyclesModuleState, publisherCyclesState } from '..';
import { RemoveCycleBookState } from './remove-cycle-book.reducer';

const removeCycleBookState = createSelector(publisherCyclesState, (state: PublisherCyclesModuleState) => {
  if (state) return state.removeCycleBook;

  return undefined;
});

export const cycleWithRemovedBook = createSelector(removeCycleBookState, (state: RemoveCycleBookState) => {
  if (state) state.cycle;

  return undefined;
});
export const removedBookFromCycle = createSelector(removeCycleBookState, (state: RemoveCycleBookState) => {
  if (state) return state.book;

  return undefined;
});

