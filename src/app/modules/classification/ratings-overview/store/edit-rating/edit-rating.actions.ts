import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { Rating } from '../../../../api/ratings/models/rating.model';

export const EDIT_RATING = createAction('[RATINGS] Change rating', props<{ payload: { book: { id: number, guid: UUID }, newRating: Rating } }>());
export const EDIT_RATING_SUCCESS = createAction('[RATINGS] Change rating success', props<{ payload: { overview: RatingsOverview, userId: number, newRating: Rating, oldRating: Rating } }>());
export const EDIT_RATING_FALIURE = createAction('[RATINGS] Change ratings faliure', props<{ payload: { model: ApiError } }>());
