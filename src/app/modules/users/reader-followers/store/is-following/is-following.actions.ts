import { createAction, props } from "@ngrx/store";
import { ApiError } from "src/app/modules/api/api-error.model";

export const IS_FOLLOWING = createAction('[READER_FOLLOWERS] Is following', props<{ payload: { followedId: number } }>());
export const FETCH_IS_FOLLOWING_STATE = createAction('[READER_FOLLOWERS] Fetch is following state', props<{ payload: { followedId: number, flag: boolean } }>());
export const FETCH_IS_FOLLOWING_FALIURE = createAction('[READER_FOLLOWERS] Fetch is following faliure', props<{ payload: { error: ApiError } }>());
