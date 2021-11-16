import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Rating } from '../../../../api/ratings/models/rating.model';
import * as fromActions from './add-rating.actions';

export interface AddRatingState {
  rating: Rating;
  processing: boolean,
  error: ApiError
}

 const initialState: AddRatingState = {
  rating: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_RATING, (state, action) => {
    return { ...state, rating: action.payload.rating, processing: true }
  }),
  on(fromActions.ADD_RATING_SUCCESS, (state) => ({ ...state, processing: false })),
  on(fromActions.ADD_RATING_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function addRatingReducer(state: AddRatingState, action: Action) {
  return reducer(state, action);
}
