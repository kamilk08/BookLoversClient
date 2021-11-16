import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';

import * as fromActions from './review-spoiler.actions';

export interface ReviewSpoilersState {
  review: Review,
  userId: number,
  processing: boolean,
  error: ApiError
};

const initialState: ReviewSpoilersState = {
  review: undefined,
  userId: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_SPOILER_TAG, (state, action) => {
    return { ...state, review: action.payload.review, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.ADD_SPOILER_TAG_SUCCESS, (state) => {
    const review = state.review;
    review.addSpoilerTag(state.userId);

    return { ...state, review: review, processing: false }
  }),
  on(fromActions.ADD_SPOILER_TAG_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  }),
  on(fromActions.REMOVE_SPOILER_TAG, (state, action) => {
    return { ...state, review: action.payload.review, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.REMOVE_SPOILER_TAG_SUCCESS, (state) => {
    const review = state.review;
    review.removeSpoilerTag(state.userId);

    return { ...state, review: review, processing: false }
  }),
  on(fromActions.REMOVE_SPOILER_TAG_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function reviewSpoilersReducer(state: ReviewSpoilersState, action: Action) {
  return reducer(state, action);
}
