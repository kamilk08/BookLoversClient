import { fetchMany, fetchSingle } from 'src/app/modules/shared/common/store-extensions';
import * as fromActions from './ratings.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Rating } from '../../../api/ratings/models/rating.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface Ratings {
  entities: { [id: number]: Rating }
  ids: number[],
  processing: boolean
  error: ApiError
}

const initialState: Ratings = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_RATING, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_MULTIPLE_USER_RATINGS, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_RATING, (state, action) => {
    const newState = fetchSingle((rating: Rating) => rating.id, state, action.payload.rating);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_MULTIPLE_RATINGS, (state, action) => {
    const newState = fetchMany((rating: Rating) => rating.id, state, action.payload.ratings);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.UPSERT_RATING, (state, action) => {
    const rating = state.entities[action.payload.rating.id];
    rating.stars = action.payload.stars;

    return { ...state, entities: { ...state.entities, [rating.id]: rating } }

  }),
  on(fromActions.FETCH_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
)

export function ratingsReducer(state: Ratings, action: Action) {
  return reducer(state, action);
}
