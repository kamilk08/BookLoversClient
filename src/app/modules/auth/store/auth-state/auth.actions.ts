import { createAction, props } from "@ngrx/store";
import { User } from "src/app/modules/api/auth/models/user.model";

export const ASSIGN_USER = createAction('[AUTH] Assign user');
export const ASSIGN_USER_SUCCESS = createAction('[AUTH] Assign user success', props<{ payload: { user: User } }>());
export const ASSIGN_USER_FALIURE = createAction('[AUTH] Assign user faliure', props<{ payload: { error: any } }>());
export const LOGOUT = createAction('[AUTH] Logout')
export const LOGOUT_SUCCESS = createAction('[AUTH] Logout success');
export const LOGOUT_FALIURE = createAction('[AUTH] Logout faliure', props<{ payload: { error: any } }>());
