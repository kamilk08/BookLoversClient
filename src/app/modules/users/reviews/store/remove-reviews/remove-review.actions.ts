import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const REMOVE_REVIEW = createAction('[REVIEWS] Remove review', props<{ payload: { review: Review } }>());
export const REMOVE_REVIEW_SUCCESS = createAction('[REVIEWS] Remove review success', props<{ payload: { review: Review } }>());
export const REMOVE_REVIEW_FALIURE = createAction('[REVIEWS] Remove review faliure', props<{ payload: { model: ApiError } }>());
