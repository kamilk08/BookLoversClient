import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Follower } from 'src/app/modules/shared';

export const FETCH_READER_FOLLOWERS = createAction('[READER_FOLLOWERS] Fetch reader followers', props<{ payload: { readerId: number, followers: Follower[] } }>());
export const FETCH_READER_FOLLOWERS_FALIURE = createAction('[READER_FOLLOWERS] Fetch reader followers faliure', props<{ payload: { error: ApiError } }>());
export const ADD_FOLLOWER_TO_READER = createAction('[READER_FOLLOWERS] Add follower to reader', props<{ payload: { followedId: number, followedById: number } }>());
export const REMOVE_FOLLOWER_FROM_READER = createAction('[READER_FOLLOWERS] Remove follower from readers', props<{ payload: { followedId: number, followedById: number } }>());



