import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';
import * as fromActions from './add-review-actions';

export interface AddReviewState {
  review: Review,
  isAddedSuccessfully: boolean,
  processing: boolean,
  error: ApiError
};

const initialState: AddReviewState = {
  review: undefined,
  isAddedSuccessfully: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_REVIEW, (state, action) => {
    return { ...state, review: action.payload.review, processing: true }
  }),
  on(fromActions.ADD_REVIEW_SUCCESS, (state) => {
    return { ...state, isAddedSuccessfully: true, processing: false }
  }),
  on(fromActions.ADD_REVIEW_FALIURE, (state, action) => {
    return { ...state, isAddedSuccessfully: false, error: action.payload.model, processing: false }
  })
);

export function addReviewReducer(state: AddReviewState, action: Action) {
  return reducer(state, action);
}
