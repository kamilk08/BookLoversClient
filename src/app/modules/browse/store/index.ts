import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromBrowsing from './browse.reducer';
import * as fromBrowsePage from './browse-page.reducer';

export interface BrowseModuleState {
  browsingState: fromBrowsing.BrowseState,
  browsePageState: fromBrowsePage.BrowsePageState,
};


const reducerMap: ActionReducerMap<BrowseModuleState> = {
  browsingState: fromBrowsing.browseReducer,
  browsePageState: fromBrowsePage.browsePageReducer
};

const reducer = combineReducers(reducerMap);

export function browseModuleReducer(state: BrowseModuleState, action: Action) {
  return reducer(state, action);
};

export const browseMainSelector = createFeatureSelector('browse');
