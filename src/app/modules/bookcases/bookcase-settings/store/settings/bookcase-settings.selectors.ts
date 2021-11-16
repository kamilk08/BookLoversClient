import { createSelector } from "@ngrx/store";
import { bookcaseSettingsModuleSelector, BookcaseSettingsState } from '..';
import { SettingsState } from './bookcase-settings.reducer';

const settings = createSelector(bookcaseSettingsModuleSelector, (state: BookcaseSettingsState) => state.settingsState);

export const bookcaseSettingsById = (bookcaseId: number) => createSelector(settings, (state: SettingsState) => {
  if (bookcaseId) {
    return state.entities[bookcaseId];
  }

  return undefined;
});
