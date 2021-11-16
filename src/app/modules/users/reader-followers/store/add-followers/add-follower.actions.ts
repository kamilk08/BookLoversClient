import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Reader } from '../../../../api/readers/models/reader.model';

export const ADD_FOLLOWER = createAction('[READER_FOLLOWERS] Add follower', props<{ payload: { followed: Reader, followedBy: Reader } }>());
export const ADD_FOLLOWER_SUCCESS = createAction('[READER_FOLLOWERS] Add follower success', props<{ payload: { followedId: number, followedById: number } }>());
export const ADD_FOLLOWER_FALIURE = createAction('[READER_FOLLOWERS] Add follower faliure', props<{ payload: { model: ApiError } }>());
