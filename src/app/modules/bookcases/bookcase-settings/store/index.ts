import { Action, ActionReducerMap, combineReducers, createFeatureSelector } from '@ngrx/store';
import * as fromSettings from '../store/settings/bookcase-settings.reducer';
import * as fromPage from '../store/page/bookcase-settings-page.reducer';

export interface BookcaseSettingsState {
  settingsState: fromSettings.SettingsState,
  pageState: fromPage.BookcaseSettingsPage
}

const reducerMap: ActionReducerMap<BookcaseSettingsState> = {
  settingsState: fromSettings.settingsReducer,
  pageState: fromPage.bookcaseSettingsPageReducer
}

const reducer = combineReducers(reducerMap);

export function bookcaseSettingsModuleReducer(state: BookcaseSettingsState, action: Action) {
  return reducer(state, action);
}

export const bookcaseSettingsModuleSelector = createFeatureSelector<BookcaseSettingsState>('bookcase-settings');
