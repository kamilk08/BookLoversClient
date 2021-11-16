import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

import * as fromActions from './remove-review.actions';

export interface RemoveReviewState {
  review: Review,
  processing: boolean,
  isRemovedSuccessfully: boolean
  error: ApiError
}

const initialState: RemoveReviewState = {
  review: undefined,
  processing: false,
  isRemovedSuccessfully: undefined,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_REVIEW, (state, action) => {
    return { ...state, review: action.payload.review, processing: true }
  }),
  on(fromActions.REMOVE_REVIEW_SUCCESS, (state) => ({ ...state, isRemovedSuccessfully: true, processing: false })),
  on(fromActions.REMOVE_REVIEW_FALIURE, (state, action) => ({ ...state, isRemovedSuccessfully: false, error: action.payload.model, processing: false }))
);

export function removeReviewReducer(state: RemoveReviewState, action: Action) {
  return reducer(state, action);
}
