import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Action, createReducer, on } from "@ngrx/store";
import { updateFormValidity } from "src/app/modules/shared/common/update-form-validity";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import { Profile } from "../../../../../api/profiles/models/profile.model";
import * as fromActions from './change-profile-form.actions';

export interface ChangeProfileFormState {
  form: FormGroup
}

const initialState: ChangeProfileFormState = {
  form: createChangeProfileForm()
}

const reducer = createReducer(initialState,
  on(fromActions.SUBMIT_CHANGE_PROFILE_FORM, (state, action) => {
    return { ...state, form: action.payload.form }
  }),
  on(fromActions.CHANGE_PROFILE_FORM_VALID, (state) => {
    return { ...state }
  }),
  on(fromActions.CHANGE_PROFILE_FORM_INVALID, (state) => {
    updateFormValidity(state.form);

    return { ...state, form: new FormGroup(state.form.controls) }
  }),
  on(fromActions.UPDATE_CHANGE_PROFILE_FORM, (state, action) => {

    updateProfileForm(action.payload.profile, state.form)

    return { ...state, form: new FormGroup(state.form.controls) }
  })
);

export function changeProfileFormReducer(state: ChangeProfileFormState, action: Action) {
  return reducer(state, action);
}


function createChangeProfileForm() {
  return new FormGroup({
    identity: new FormGroup({
      firstName: new FormControl(),
      secondName: new FormControl(),
      birthDate: new FormControl(null, [CommonValidators.invalidDate]),
      sex: new FormControl(null, [Validators.min(1), Validators.max(3)])
    }),
    address: new FormGroup({
      country: new FormControl(),
      city: new FormControl()
    }),
    about: new FormGroup({
      webSite: new FormControl(),
      content: new FormControl()
    })
  })
}

function updateProfileForm(profile: Profile, form: FormGroup) {
  form.get('identity.firstName').setValue(profile.specification.firstName);
  form.get('identity.secondName').setValue(profile.specification.secondName);
  form.get('identity.birthDate').setValue(profile.specification.birthDate);
  form.get('identity.sex').setValue(profile.specification.sex.toString());

  form.get('address.country').setValue(profile.address.country);
  form.get('address.city').setValue(profile.address.city);

  form.get('about.webSite').setValue(profile.about.webSite);
  form.get('about.content').setValue(profile.about.content);
}
