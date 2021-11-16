import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Rating } from '../../../../api/ratings/models/rating.model';
import * as fromActions from './remove-rating.actions';

export interface RemoveRatingState {
  removedRating: Rating
  processing: boolean
  error: ApiError
}

const initialState: RemoveRatingState = {
  removedRating: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_RATING, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.REMOVE_RATING_SUCCESS, (state, action) => {
    return { ...state, removedRating: action.payload.removedRating, processing: false }
  }),
  on(fromActions.REMOVE_RATING_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function removeRatingReducer(state: RemoveRatingState, action: Action) {
  return reducer(state, action);
};


