import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { Profile } from "../../../../../api/profiles/models/profile.model";

export const SUBMIT_CHANGE_PROFILE_FORM = createAction('[PROFILE] Submit change profile form', props<{ payload: { form: FormGroup } }>());
export const UPDATE_CHANGE_PROFILE_FORM = createAction('[PROFILE] Update change profile form', props<{ payload: { profile: Profile } }>());
export const CHANGE_PROFILE_FORM_VALID = createAction('[PROFILE] Change profile form valid', props<{ payload: { form: FormGroup } }>());
export const CHANGE_PROFILE_FORM_INVALID = createAction('[PROFILE] Change profile form invalid');
