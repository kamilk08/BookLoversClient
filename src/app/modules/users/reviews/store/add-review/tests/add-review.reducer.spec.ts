import { AddReviewState } from "../add-review.reducer";

import * as fromActions from '../add-review-actions';
import * as fromReducer from '../add-review.reducer';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { UUID } from "angular2-uuid";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('ADD_REVIEW_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  const initialState: AddReviewState = {
    review: undefined,
    isAddedSuccessfully: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_REVIEW', () => {
    it('should return new state with processing set to true', () => {

      const action = fromActions.ADD_REVIEW({ payload: { review } });

      const newState = fromReducer.addReviewReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('ADD_REVIEW_SUCCESS', () => {
    it('should return new state with isAddedSuccessfully property set to true', () => {

      const action = fromActions.ADD_REVIEW_SUCCESS({ payload: { reviewId: 1, review } });

      const newState = fromReducer.addReviewReducer(initialState, action);

      expect(newState.isAddedSuccessfully).toBeTruthy();
    });
  });

  describe('ADD_REVIEW_FALIURE', () => {
    it('should return new state with isAddedSuccessfully property set to false and defined error property', () => {

      const action = fromActions.ADD_REVIEW_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.addReviewReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });

  });

});
