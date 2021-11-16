import { createAction, props } from '@ngrx/store';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';

export const MANAGE_RATING_SUCCESS = createAction('[RATINGS_OVERVIEWS] Manage rating success');
export const SELECT_RATINGS_OVEREVIEW = createAction('[RATING_OVERVIEWS] Select ratings overview', props<{ payload: { bookId: number } }>());
export const SELECT_MULTIPLE_OVERVIEWS = createAction('[RATINGS_OVERVIEWS] Select multiple overviews', props<{ payload: { bookIds: number[] } }>());
export const FETCH_OVERVIEW = createAction('[RATINGS_OVERVIEWS] Fetch overview', props<{ payload: { overview: RatingsOverview } }>());
export const FETCH_MULTIPLE_OVERVIEWS = createAction('[RATINGS_OVERVIEWS] Fetch multiple overviews', props<{ payload: { overviews: RatingsOverview[] } }>());
export const FETCH_OVERVIEW_FALIURE = createAction('[RATINGS_OVERVIEWS] Fetch overview faliure', props<{ payload: { error: any } }>());
