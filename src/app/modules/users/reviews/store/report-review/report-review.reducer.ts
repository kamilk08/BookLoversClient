import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Review } from '../../../../api/reviews/models/review.model';
import * as fromActions from './report-review.actions';

export interface ReportReviewState {
  review: Review,
  userId: number,
  processing: boolean,
  error: ApiError
}

const initialState: ReportReviewState = {
  review: undefined,
  userId: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REPORT_REVIEW, (state, action) => {
    return { ...state, review: action.payload.review, userId: action.payload.userId, processing: true }
  }),
  on(fromActions.REPORT_REVIEW_SUCCESS, (state) => {
    const review = state.review;
    review.reportReview(state.userId);

    return { ...state, review: review, processing: false }
  }),
  on(fromActions.REPORT_REVIEW_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function reporReviewReducer(state: ReportReviewState, action: Action) {
  return reducer(state, action);
}
