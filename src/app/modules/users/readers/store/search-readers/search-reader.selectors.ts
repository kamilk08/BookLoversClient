import { createSelector } from "@ngrx/store";
import { readersModuleState, ReadersModuleState } from '..';
import { SearchReaderState } from './search-reader.reducer';

const searchReaderState = createSelector(readersModuleState, (state: ReadersModuleState) => {
  if (state) return state.searchReaders;

  return undefined;
});

export const searchReaderPage = createSelector(searchReaderState, (state: SearchReaderState) => {
  if (state) return state.pageResult;

  return undefined;
});

export const processing = createSelector(searchReaderState, (state: SearchReaderState) => {
  if(state) return state.processing;

  return undefined;
});
