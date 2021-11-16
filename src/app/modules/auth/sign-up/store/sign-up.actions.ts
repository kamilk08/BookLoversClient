import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";
import { SignUpModel as SignUpModel } from '../../../api/auth/sign-up/models/sign-up.model';

export const SIGN_UP = createAction('[SIGN_UP] Sign up', props<{ payload: { signUpModel: SignUpModel } }>());
export const SIGN_UP_SUCCESS = createAction('[SIGN_UP] Sign up success');
export const SIGN_UP_FALIURE = createAction('[SIGN_UP] Sign up faliure', props<{ payload: { error: ApiError } }>());
