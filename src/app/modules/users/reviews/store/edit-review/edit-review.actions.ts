import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const EDIT_REVIEW = createAction('[REVIEWS] Edit review', props<{ payload: { review: Review } }>());
export const EDIT_REVIEW_SUCCESS = createAction('[REVIEWS] Edit review success', props<{ payload: { review: Review } }>());
export const EDIT_REVIEW_FALIURE = createAction('[REVIEWS] Edit review faliure', props<{ payload: { model: ApiError } }>());
