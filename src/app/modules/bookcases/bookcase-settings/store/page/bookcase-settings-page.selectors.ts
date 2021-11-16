import { createSelector } from "@ngrx/store";
import { bookcaseSettingsModuleSelector, BookcaseSettingsState } from "..";
import { BookcaseSettingsPage } from "./bookcase-settings-page.reducer";

const pageState = createSelector(bookcaseSettingsModuleSelector, (state: BookcaseSettingsState) => {
  if (state) return state.pageState;

  return undefined;
});

export const settingForm = createSelector(pageState, (state: BookcaseSettingsPage) => {
  if (state) return state.form;

  return undefined;
});

