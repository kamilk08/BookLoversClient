import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const SELECT_REVIEW = createAction('[REVIEWS] Select review', props<{ payload: { readerId: number, bookId: number } }>());
export const FETCH_REVIEW = createAction('[REVIEWS] Fetch review', props<{ payload: { review: Review } }>());
export const FETCH_MANY_REVIEWS = createAction('[REVIEWS] Fetch many reviews', props<{ payload: { reviews: Review[] } }>());
export const FETCH_REVIEW_FALIURE = createAction('[REVIEWS] Fetch review faliure', props<{ payload: { error: ApiError } }>());
export const UPDATE_REVIEW = createAction('[REVIEWS] Update review', props<{ payload: { review: Review } }>());
export const REMOVE_FROM_CURRENT_REVIEWS = createAction('[REVIEWS] Remove from current reviews', props<{ payload: { review: Review } }>());

export const REVIEW_ACTION_SUCCESS = createAction('[REVIEWS] Review action success');
