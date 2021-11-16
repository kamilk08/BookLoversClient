import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromManageBookcase from './bookcase-preview.reducer';
import * as fromReadedShelfState from './readed-shelf/readed-shelf.reducer';

export interface BookcasePreviewState {
  manageBookcaseState: fromManageBookcase.ManageBookcase,
  readedShelfState: fromReadedShelfState.ReadedShelfState
}

const reducersMap: ActionReducerMap<BookcasePreviewState> = {
  manageBookcaseState: fromManageBookcase.manageBookcaseReducer,
  readedShelfState: fromReadedShelfState.readedShelfReducer
}

const reducer = combineReducers(reducersMap);

export function bookcasePreviewReducer(state: BookcasePreviewState, action: Action) {
  return reducer(state, action);
}

export const baseBookcasePreivewSelector = createFeatureSelector('bookcase-preview');
