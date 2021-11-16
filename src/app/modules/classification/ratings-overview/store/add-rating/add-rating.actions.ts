import { createAction, props } from '@ngrx/store';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { Rating } from '../../../../api/ratings/models/rating.model';

export const ADD_RATING = createAction('[RATINGS] Add rating', props<{ payload: { book: { id: number, guid: UUID }, bookcaseGuid: UUID, rating: Rating } }>());
export const ADD_RATING_SUCCESS = createAction('[RATINGS] Add rating success', props<{ payload: { overview: RatingsOverview, rating: Rating } }>());
export const ADD_RATING_FALIURE = createAction('[RATINGS] Add ratings faliure', props<{ payload: { model: ApiError } }>());
