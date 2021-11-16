import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { Rating } from '../../../../api/ratings/models/rating.model';

export const REMOVE_RATING = createAction('[RATINGS] Remove rating', props<{ payload: { book: { id: number, guid: UUID }, userId: number } }>());
export const REMOVE_RATING_SUCCESS = createAction('[RATINGS] Remove rating success', props<{ payload: { overview: RatingsOverview, userId: number, removedRating: Rating } }>());
export const REMOVE_RATING_FALIURE = createAction('[RATINGS] Remove rating faliure', props<{ payload: { model: ApiError } }>());
