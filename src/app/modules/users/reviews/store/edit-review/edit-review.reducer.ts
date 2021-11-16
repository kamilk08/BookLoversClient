import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';
import * as fromActions from './edit-review.actions';

export interface EditReviewState {
  review: Review
  isEditedSuccessfully: boolean
  processing: boolean
  error: ApiError
};

const initialState: EditReviewState = {
  review: undefined,
  isEditedSuccessfully: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.EDIT_REVIEW, (state, action) => {
    return { ...state, review: action.payload.review, processing: true }
  }),
  on(fromActions.EDIT_REVIEW_SUCCESS, (state) => {
    return { ...state, isEditedSuccessfully: true, processing: false }
  }),
  on(fromActions.EDIT_REVIEW_FALIURE, (state, action) => {
    return { ...state, isEditedSuccessfully: false, error: action.payload.model, processing: false }
  })
);

export function editReviewReducer(state: EditReviewState, action: Action) {
  return reducer(state, action);
}
