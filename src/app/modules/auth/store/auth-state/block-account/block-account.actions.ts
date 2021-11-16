import { createAction, props } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { ApiError } from "src/app/modules/api/api-error.model";

export const BLOCK_ACCOUNT = createAction('[AUTH] Block user', props<{ payload: { readerGuid: UUID } }>());
export const BLOCK_ACCOUNT_SUCCESS = createAction('[AUTH] Block user success', props<{ payload: { readerGuid: UUID } }>());
export const BLOCK_ACCOUNT_FALIURE = createAction('[AUTH] Block user faliure', props<{ payload: { error: ApiError } }>());
