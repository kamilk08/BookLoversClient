import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

export const LIKE_REVIEW = createAction('[REVIEWS] Like review', props<{ payload: { review: Review, userId: number } }>());
export const LIKE_REVIEW_SUCCESS = createAction('[REVIEWS] Like review success');
export const LIKE_REVIEW_FALIURE = createAction('[REVIEWS] Like review faliure', props<{ payload: { model: ApiError } }>());

export const UNLIKE_REVIEW = createAction('[REVIEWS] Unlike review', props<{ payload: { review: Review, userId: number } }>());
export const UNLIKE_REVIEW_SUCCESS = createAction('[REVIEWS] Unlike review success');
export const UNLIKE_REVIEW_FALIURE = createAction('[REVIEWS] Unlike review faliure', props<{ payload: { model: ApiError } }>());
