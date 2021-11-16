import * as fromActions from './review.actions';

import { fetchMany, fetchSingle, hasEntity } from 'src/app/modules/shared/common/store-extensions';
import { createReducer, on, Action } from '@ngrx/store';
import { Review } from '../../../../api/reviews/models/review.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface ReviewsState {
  entities: { [reviewId: number]: Review },
  ids: number[],
  processing: boolean
  error: ApiError
}

const initialState: ReviewsState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_REVIEW, (state) => ({ ...state, processing: true })),
  on(fromActions.FETCH_REVIEW, (state, action) => {
    const newState = fetchSingle((review: Review) => review.identification.id, state, action.payload.review);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_REVIEW_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error })),
  on(fromActions.FETCH_MANY_REVIEWS, (state, action) => {
    const newState = fetchMany((review: Review) => review.identification.id, state, action.payload.reviews);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.UPDATE_REVIEW, (state, action) => {
    return { ...state, entities: { ...state.entities, [action.payload.review.identification.id]: action.payload.review } };
  }),
  on(fromActions.REMOVE_FROM_CURRENT_REVIEWS, (state, action) => {
    if (action.payload.review) {
      const review = state.entities[action.payload.review.identification.id];
      const index = state.ids.indexOf(review.identification.id);
      state.ids.splice(index, 1);
      delete state.entities[review.identification.id];
    }

    return { ...state, entities: state.entities, ids: state.ids, processing: true }
  })
)

export function reviewsReducer(state: ReviewsState, action: Action) {
  return reducer(state, action);
}
