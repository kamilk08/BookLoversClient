import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const ADD_REVIEW = createAction('[REVIEWS] Add review', props<{ payload: { review: Review } }>());
export const ADD_REVIEW_SUCCESS = createAction('[REVIEWS] Add review success', props<{ payload: { reviewId: number, review: Review } }>());
export const ADD_REVIEW_FALIURE = createAction('[REVIEWS] Add review faliure', props<{ payload: { model: ApiError } }>());
