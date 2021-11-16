import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const ADD_SPOILER_TAG = createAction('[REVIEWS] Add spoiler tag', props<{ payload: { review: Review, userId: number } }>());
export const ADD_SPOILER_TAG_FALIURE = createAction('[REVIEWS] Add spoiler tag faliure', props<{ payload: { model: ApiError } }>());
export const ADD_SPOILER_TAG_SUCCESS = createAction('[REVIEWS] Add spoiler tag success');

export const REMOVE_SPOILER_TAG = createAction('[REVIEWS] Remove spoiler tag', props<{ payload: { review: Review, userId: number } }>());
export const REMOVE_SPOILER_TAG_FALIURE = createAction('[REVIEWS] Remove spoiler tag faliure', props<{ payload: { model: ApiError } }>());
export const REMOVE_SPOILER_TAG_SUCCESS = createAction('[REVIEWS] Remove spoiler tag success');
