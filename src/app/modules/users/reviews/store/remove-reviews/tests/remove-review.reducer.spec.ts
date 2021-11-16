
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReviewContent } from 'src/app/modules/api/reviews/models/review-content.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { ReviewedBook } from 'src/app/modules/api/reviews/models/reviewed-book.model';
import { ReviewedBy } from 'src/app/modules/api/reviews/models/reviewed-by.model';
import * as fromActions from '../remove-review.actions';
import * as fromReducer from '../remove-review.reducer';
import { RemoveReviewState } from '../remove-review.reducer';

describe('REMOVE_REVIEW_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()), new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  const initialState: RemoveReviewState = {
    review: undefined,
    processing: false,
    isRemovedSuccessfully: undefined,
    error: undefined
  };

  describe('REMOVE_REVIEW', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.REMOVE_REVIEW({ payload: { review } });

      const newState = fromReducer.removeReviewReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('REMOVE_REVIEW_SUCCESS', () => {
    it('should return new state with processing set to false and isRemovedSuccessfully to true', () => {

      const action = fromActions.REMOVE_REVIEW_SUCCESS({ payload: { review } });

      const newState = fromReducer.removeReviewReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.isRemovedSuccessfully).toBeTruthy();
    });
  });

  describe('REMOVE_REVIEW_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.REMOVE_REVIEW_FALIURE({ payload: { model: new ApiError() } });

      const newState = fromReducer.removeReviewReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });

  });

});
