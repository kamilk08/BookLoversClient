import { ReviewSpoilersState } from "../review-spoiler.reducer";

import * as fromActions from '../review-spoiler.actions';
import * as fromReducer from '../review-spoiler.reducer';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { UUID } from "angular2-uuid";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";

describe('REVIEW_SPOILER_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true),
    new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  const initialState: ReviewSpoilersState = {
    review: undefined,
    userId: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_SPOILER_TAG', () => {
    it('should return new state with defined review,userId property and processing set to true', () => {

      const action = fromActions.ADD_SPOILER_TAG({ payload: { review, userId: 1 } });

      const newState = fromReducer.reviewSpoilersReducer(initialState, action);

      expect(newState.review).toEqual(review);
      expect(newState.userId).toEqual(action.payload.userId);
      expect(newState.processing).toBeTruthy();
    })
  });

  describe('ADD_SPOILER_TAG_SUCCESS', () => {
    it('should return new state with review that has a spoiler tag', () => {
      const initialAction = fromActions.ADD_SPOILER_TAG({ payload: { review, userId: 1 } });

      let newState = fromReducer.reviewSpoilersReducer(initialState, initialAction);

      const action = fromActions.ADD_SPOILER_TAG_SUCCESS();

      newState = fromReducer.reviewSpoilersReducer(newState, action);

      expect(newState.review.spoilerTags.length).toEqual(1);
    })
  });

  describe('REMOVE_SPOILER_TAG', () => {
    it('should return new state with defined review,userId property and processing set to true', () => {

      const userId = 1;

      const action = fromActions.REMOVE_SPOILER_TAG({ payload: { review, userId } });

      const newState = fromReducer.reviewSpoilersReducer(initialState, action);

      expect(newState.review).toEqual(review);
      expect(newState.userId).toEqual(action.payload.userId);
      expect(newState.processing).toBeTruthy();
    })
  });

});
