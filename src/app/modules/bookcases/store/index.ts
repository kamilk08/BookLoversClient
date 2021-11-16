import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';

import * as fromBookcasePageState from '../store/page/bookcase-page.reducer';
import * as fromBookcases from '../store/bookcases/bookcase.reducer';

export interface BookcaseModuleState {
  bookcasesState: fromBookcases.BookcasesState,
  bookcasePageState: fromBookcasePageState.BookcasePageState
}

const reducerMap: ActionReducerMap<BookcaseModuleState> = {
  bookcasesState: fromBookcases.bookcaseReducer,
  bookcasePageState: fromBookcasePageState.bookcasePageReducer
}

const moduleReducer = combineReducers(reducerMap);

export function bookcaseModuleReducer(state: BookcaseModuleState, action: Action) {
  return moduleReducer(state, action);
}

export const bookcaseModuleState = createFeatureSelector<BookcaseModuleState>('bookcase');

