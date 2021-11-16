import { ReviewLikesState } from "../review-likes.reducer";

import * as fromActions from '../review-likes.actions';
import * as fromReducer from '../review-likes.reducer';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { UUID } from "angular2-uuid";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";

describe('REVIEW_LIKES_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true),
    new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;


  const initialState: ReviewLikesState = {
    userId: undefined,
    review: undefined,
    processing: false,
    error: undefined
  }

  describe('LIKE_REVIEW', () => {
    it('should return new state with defined userId,review and processing set to true', () => {

      const action = fromActions.LIKE_REVIEW({ payload: { review, userId: 1 } });

      const newState = fromReducer.reviewLikesReducer(initialState, action);

      expect(newState.review).toEqual(review);
      expect(newState.userId).toEqual(action.payload.userId);
      expect(newState.processing).toBeTruthy();
    });
  })

  describe('UNLIK_REVIEW', () => {
    it('should return new state with defined userId,review and processing set to true', () => {

      const action = fromActions.UNLIKE_REVIEW({ payload: { review, userId: 1 } });

      const newState = fromReducer.reviewLikesReducer(initialState, action);

      expect(newState.review).toEqual(review);
      expect(newState.userId).toEqual(action.payload.userId);
      expect(newState.processing).toBeTruthy();

    });
  })

  describe('LIKE_REVIEW_SUCCESS', () => {
    it('should return new state with updated review property', () => {

      const initialAction = fromActions.LIKE_REVIEW({ payload: { review, userId: 1 } });

      let newState = fromReducer.reviewLikesReducer(initialState, initialAction);

      const action = fromActions.LIKE_REVIEW_SUCCESS();

      newState = fromReducer.reviewLikesReducer(newState, action);

      expect(newState.review.likes.length).toEqual(1);

    });
  })
});
