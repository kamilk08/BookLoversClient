import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";

import * as fromActions from '../page/bookcase-settings-page.actions'

export interface BookcaseSettingsPage {
  form: FormGroup
}

const initialState: BookcaseSettingsPage = {
  form: createBookcaseSettingsForm()
};

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_SETTINGS_FORM, (state) => ({ ...state })),
  on(fromActions.UPDATE_SETTINGS_FORM, (state, action) => {

    const form = state.form;

    form.get('shelfCapacity').setValue(action.payload.settings.shelfCapacity.toString());
    form.get('privacy').setValue(action.payload.settings.privacy.toString());

    return { ...state, form: new FormGroup(form.controls) }
  })
);

export function bookcaseSettingsPageReducer(state: BookcaseSettingsPage, action: Action) {
  return reducer(state, action);
}

function createBookcaseSettingsForm() {
  return new FormGroup({
    shelfCapacity: new FormControl(null, [Validators.required]),
    privacy: new FormControl(null, [Validators.required])
  });
}
