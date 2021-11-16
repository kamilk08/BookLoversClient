import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import { BookcasePage } from './bookcase-pagination.reducer';
import * as fromPagination from '../store/bookcase-pagination.reducer';

export interface BookcasePaginationModuleState {
  pagination: fromPagination.BookcasePage
}


const reducerMap: ActionReducerMap<BookcasePaginationModuleState> = {
  pagination: fromPagination.bookcasePaginationReducer
}

const reducer = combineReducers(reducerMap);

export function bookcasePaginationModuleReducer(state: BookcasePaginationModuleState, action: Action) {
  return reducer(state, action);
}

export const bookcasePaginationModuleState = createFeatureSelector<BookcasePaginationModuleState>('bookcase-collection')
