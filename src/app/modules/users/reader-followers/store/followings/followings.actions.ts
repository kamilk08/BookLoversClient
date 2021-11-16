import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Follower } from 'src/app/modules/shared';

export const FETCH_READER_FOLLOWINGS = createAction('[READER_FOLLOWERS] Fetch reader followings', props<{ payload: { readerId: number, followings: Follower[] } }>());
export const FETCH_READER_FOLLOWINGS_FALIURE = createAction('[READER_FOLLOWERS] Fetch reader followings faliure', props<{ payload: { error: ApiError } }>());
export const ADD_FOLLOWING_TO_READER = createAction('[READER_FOLLOWERS] Add reader following', props<{ payload: { followedById: number, followedObjectId: number } }>());
export const REMOVE_FOLLOWING_FROM_READER = createAction('[READER_FOLLOWERS] Remove reader following', props<{ payload: { followedById: number, followedObjectId: number } }>());
