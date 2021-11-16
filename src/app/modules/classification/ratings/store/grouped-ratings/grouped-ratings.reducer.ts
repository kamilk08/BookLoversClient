import { createReducer, on, Action } from '@ngrx/store';
import * as groupedRatingsAction from './grouped-ratings.actions';
import { fetchSingleWith } from 'src/app/modules/shared/common/store-extensions';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface GroupedRatings {
  entities: { [bookId: number]: any },
  ids: number[],
  processing: boolean
  error: ApiError
}

const initialState: GroupedRatings = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(groupedRatingsAction.SELECT_GROUPED_RATINGS, state => ({ ...state, processing: true })),
  on(groupedRatingsAction.FETCH_GROUPED_RATINGS, (state, action) => {
    const newState = fetchSingleWith(action.payload.bookId, state, action.payload.groupedRatings);
    return { ...state, entities: { ...newState.entities }, ids: newState.ids, processing: false };
  }),
  on(groupedRatingsAction.UPDATE_GROUPED_RATINGS, (state, action) => {
    const groupedRatings = state.entities[action.payload.bookId];
    if (groupedRatings) {
      if (action.payload.oldRating)
        groupedRatings[action.payload.oldRating] = groupedRatings[action.payload.oldRating] - 1;
      if (action.payload.newRating)
        groupedRatings[action.payload.newRating] = groupedRatings[action.payload.newRating] + 1;

      state.entities[action.payload.bookId] = groupedRatings;
    }

    return { ...state, entities: state.entities }

  }),
  on(groupedRatingsAction.FETCH_GROUPED_RATINGS_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function groupedRatingsReducer(state: GroupedRatings, action: Action) {
  return reducer(state, action);
}
