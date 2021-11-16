import { createSelector } from '@ngrx/store';
import { BookcaseStatisticsState, bookcaseStatisticsModuleState } from '.';
import { ShelvesWithBook } from './shelves-with-book.reducer';

const shelvesWithBookState = createSelector(bookcaseStatisticsModuleState, (state: BookcaseStatisticsState) => {
  if (state) return state.shelfsWithBook;

  return undefined;
})

export const shelvesWithBook = createSelector(shelvesWithBookState, (state: ShelvesWithBook) => {
  if (state) return state.items;

  return undefined;
});
export const isProcessingShelvesWithBook = createSelector(shelvesWithBookState, (state: ShelvesWithBook) => {
  if (state) return state.processing;

  return undefined;
});


