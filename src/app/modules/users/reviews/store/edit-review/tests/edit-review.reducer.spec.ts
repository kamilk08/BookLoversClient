import { EditReviewState } from "../edit-review.reducer";

import * as fromReducer from '../edit-review.reducer';
import * as fromActions from '../edit-review.actions';
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { UUID } from "angular2-uuid";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('EDIT_REVIEW_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  const initialState: EditReviewState = {
    review: undefined,
    isEditedSuccessfully: undefined,
    processing: false,
    error: undefined
  };

  describe('EDIT_REVIEW', () => {

    it('should return new state with processing property set to true and updated review property', () => {

      const action = fromActions.EDIT_REVIEW({ payload: { review } });

      const newState = fromReducer.editReviewReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
      expect(newState.review).toEqual(review);
    });
  });

  describe('EDIT_REVIEW_SUCCESS', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.EDIT_REVIEW_SUCCESS({ payload: { review } });

      const newState = fromReducer.editReviewReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.isEditedSuccessfully).toBeTruthy();
    })
  });

  describe('EDIT_REVIEW_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.EDIT_REVIEW_FALIURE({ payload: { model: error } });

      const newState = fromReducer.editReviewReducer(initialState, action);

      expect(newState.error).toBeDefined();

    })

  });

});
