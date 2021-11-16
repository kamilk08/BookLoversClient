import { createAction, props } from '@ngrx/store';
import { Rating } from '../../../api/ratings/models/rating.model';

export const SELECT_RATING = createAction('[RATINGS] Select rating', props<{ payload: { bookId: number, userId: number } }>());
export const SELECT_MULTIPLE_USER_RATINGS = createAction('[RATINGS] Select multiple user ratings', props<{ payload: { bookIds: number[], userId: number } }>());
export const FETCH_MULTIPLE_RATINGS = createAction('[RATINGS] Fetch multiple ratings', props<{ payload: { ratings: Rating[] } }>());
export const UPSERT_RATING = createAction('[RATINGS] Upsert rating', props<{ payload: { rating: Rating, stars: number } }>());
export const FETCH_RATING = createAction('[RATINGS] Fetch rating', props<{ payload: { rating: Rating } }>());
export const FETCH_FALIURE = createAction('[RATINGS] Fetch faliure', props<{ payload: { error: any } }>());
