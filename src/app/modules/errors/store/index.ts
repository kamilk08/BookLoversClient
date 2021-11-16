import { Action, ActionReducerMap, combineReducers } from '@ngrx/store';
import * as fromErrors from './errors.reducer';

export interface ErrorsState {
  currentError: fromErrors.CurrentErrorState
}

const reducerMap: ActionReducerMap<ErrorsState> = {
  currentError: fromErrors.currentErrorReducer
};

const reducer = combineReducers(reducerMap);

export function errorsStateReducer(state: ErrorsState, action: Action) {
  return reducer(state, action);
}
