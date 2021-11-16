import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';
import * as fromActions from './review-likes.actions';

export interface ReviewLikesState {
  userId: number
  review: Review,
  processing: boolean,
  error: ApiError
};

const initialState: ReviewLikesState = {
  userId: undefined,
  review: undefined,
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.LIKE_REVIEW, (state, action) => {
    return { ...state, userId: action.payload.userId, review: action.payload.review, processing: true }
  }),
  on(fromActions.LIKE_REVIEW_SUCCESS, (state) => {
    const review = state.review;
    review.likeReview(state.userId);
    return { ...state, review: review, processing: false };
  }),
  on(fromActions.LIKE_REVIEW_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  }),
  on(fromActions.UNLIKE_REVIEW, (state, action) => {
    return { ...state, userId: action.payload.userId, review: action.payload.review, processing: true }
  }),
  on(fromActions.UNLIKE_REVIEW_SUCCESS, (state) => {
    const review = state.review;
    review.unlikeReview(state.userId);

    return { ...state, review: review, processing: false }
  }),
  on(fromActions.UNLIKE_REVIEW_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function reviewLikesReducer(state: ReviewLikesState, action: Action) {
  return reducer(state, action);
}
