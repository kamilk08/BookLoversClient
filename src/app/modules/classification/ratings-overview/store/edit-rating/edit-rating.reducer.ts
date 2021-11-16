import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Rating } from '../../../../api/ratings/models/rating.model';
import * as fromActions from './edit-rating.actions';

export interface EditRatingState {
  newRating: Rating
  oldRating: Rating
  processing: boolean,
  error: ApiError
}

const initialState: EditRatingState = {
  newRating: undefined,
  oldRating: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.EDIT_RATING, (state, action) => {
    return { ...state, newRating: action.payload.newRating, processing: true }
  }),
  on(fromActions.EDIT_RATING_SUCCESS, (state, action) => {
    return { ...state, oldRating: action.payload.oldRating, processing: false }
  }),
  on(fromActions.EDIT_RATING_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function editRatingReducer(state: EditRatingState, action: Action) {
  return reducer(state, action);
}
