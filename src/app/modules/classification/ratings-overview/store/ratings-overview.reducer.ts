import { createReducer, on, Action } from '@ngrx/store';
import { fetchSingle, fetchMany } from 'src/app/modules/shared/common/store-extensions';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from './ratings-overview.actions';

export interface RatingsOverviews {
  entities: { [id: number]: RatingsOverview },
  ids: number[],
  processing: boolean,
  error: ApiError
}

const initialState: RatingsOverviews = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_RATINGS_OVEREVIEW, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_MULTIPLE_OVERVIEWS, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_OVERVIEW, (state, action) => {

    const newState = fetchSingle((overview: RatingsOverview) => overview.id, state, action.payload.overview);

    return { ...state, entities: { ...newState.entities }, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_MULTIPLE_OVERVIEWS, (state, action) => {
    const newState = fetchMany((ro: RatingsOverview) => ro.id, state, action.payload.overviews);

    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_OVERVIEW_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.error }
  }),
  on(fromActions.MANAGE_RATING_SUCCESS, state => ({ ...state, processing: false }))
);

export function overviewReducer(state: RatingsOverviews, action: Action) {
  return reducer(state, action);
}
