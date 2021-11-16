import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Reader } from '../../../../api/readers/models/reader.model';

export const REMOVE_FOLLOWER = createAction('[READER_FOLLOWERS] Remove follower', props<{ payload: { followed: Reader, followedBy: Reader } }>());
export const REMOVE_FOLLOWER_SUCCESS = createAction('[READER_FOLLOWERS] Remove susccesfull', props<{ payload: { followedId: number, followedById: number } }>());
export const REMOVE_FOLLOWER_FALIURE = createAction('[READER_FOLLOWERS] Remove follower faliure', props<{ payload: { model: ApiError } }>());
