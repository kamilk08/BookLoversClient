import { Action, props, createAction } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';

export const SELECT_GROUPED_RATINGS = createAction('[RATINGS] Select grouped ratings', props<{ payload: { bookId: number } }>());
export const FETCH_GROUPED_RATINGS = createAction('[RATINGS] Fetch grouped ratings', props<{ payload: { bookId: number, groupedRatings: any } }>());
export const UPDATE_GROUPED_RATINGS = createAction('[RATINGS] Update grouped ratings', props<{ payload: { bookId: number, oldRating?: number, newRating?: number } }>());
export const FETCH_GROUPED_RATINGS_FALIURE = createAction('[RATINGS] Fetch grouped ratings faliure', props<{ payload: { error: ApiError } }>());

