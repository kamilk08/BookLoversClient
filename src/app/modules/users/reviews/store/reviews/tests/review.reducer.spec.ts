
import { UUID } from 'angular2-uuid';
import { ReviewContent } from 'src/app/modules/api/reviews/models/review-content.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { ReviewedBook } from 'src/app/modules/api/reviews/models/reviewed-book.model';
import { ReviewedBy } from 'src/app/modules/api/reviews/models/reviewed-by.model';
import * as fromActions from '../review.actions';
import * as fromReducer from '../review.reducer';
import { ReviewsState } from '../review.reducer';

describe('REVIEW_REDUCER', () => {

  let review = new Review(new ReviewContent('review', new Date(), true), new ReviewedBook(1, UUID.UUID()),
    new ReviewedBy(1, UUID.UUID()));
  review.identification.id = 1;

  const initialState: ReviewsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  describe('SELECT_REVIEW', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_REVIEW({ payload: { readerId: 1, bookId: 1 } });

      const newState = fromReducer.reviewsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_REVIEW', () => {
    it('should return new state with updated entities property', () => {

      const action = fromActions.FETCH_REVIEW({ payload: { review } });

      const newState = fromReducer.reviewsReducer(initialState, action);

      expect(newState.entities[action.payload.review.identification.id]).toEqual(review);
    });
  });

  describe('FETCH_MANY_REVIEWS', () => {
    it('should return new state with updated entities property', () => {

      const reviews = [review];

      const action = fromActions.FETCH_MANY_REVIEWS({ payload: { reviews } });

      const newState = fromReducer.reviewsReducer(initialState, action);

      expect(newState.entities[review.identification.id]).toEqual(review);

    });
  });

  describe('REMOVE_FROM_CURRENT_REVIEWS', () => {
    it('should return new state with removed review', () => {

      const fetchAction = fromActions.FETCH_REVIEW({ payload: { review } });

      let newState = fromReducer.reviewsReducer(initialState, fetchAction);

      const action = fromActions.REMOVE_FROM_CURRENT_REVIEWS({ payload: { review } });

      newState = fromReducer.reviewsReducer(newState, action);

      expect(newState.entities[review.identification.id]).toBeUndefined();
    });
  });

});
