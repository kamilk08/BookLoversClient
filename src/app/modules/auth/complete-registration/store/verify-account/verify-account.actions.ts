import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { VerifyAccount } from '../../../../api/auth/complete-registration/models/account-verification.model';

export const VERIFY_ACCOUNT = createAction("[AUTH] Verify user account", props<{ payload: { model:VerifyAccount } }>());
export const VERIFY_ACCOUNT_SUCCESS = createAction("[AUTH] Verify user success");
export const VERIFY_ACCOUNT_FALIURE = createAction("[AUTH] Verify user faliure", props<{ payload: { error: ApiError } }>());
export const RESET_VERIFY_ACCOUNT = createAction('[AUTH] Reset verify account form');
