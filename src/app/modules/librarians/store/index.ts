import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromLibrarians from './librarian.reducer';
import * as fromPagination from './pagination/librarians-pagination.reducer';

export interface LibrariansModuleState {
  librarians: fromLibrarians.LibrariansState,
  pagination: fromPagination.LibrariansPaginationState
};


const reducerMap: ActionReducerMap<LibrariansModuleState> = {
  librarians: fromLibrarians.librariansReducer,
  pagination: fromPagination.librariansPaginationReducer
};

const reducer = combineReducers(reducerMap);

export function librarianModuleReducer(state: LibrariansModuleState, action: Action) {
  return reducer(state, action);
}

export const librariansModuleState = createFeatureSelector('librarians');
