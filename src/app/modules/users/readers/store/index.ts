import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import * as fromReaders from './readers/reader.reducer';
import * as fromSearchReaders from './search-readers/search-reader.reducer';

export interface ReadersModuleState {
  readers: fromReaders.ReadersState,
  searchReaders: fromSearchReaders.SearchReaderState
}

const reducerMap: ActionReducerMap<ReadersModuleState> = {
  readers: fromReaders.readerReducer,
  searchReaders:fromSearchReaders.searchReaderReducer
};

const reducer = combineReducers(reducerMap);

export function readersStateReducer(state: ReadersModuleState, action: Action) {
  return reducer(state, action);
}

export const readersModuleState = createFeatureSelector('readers');
