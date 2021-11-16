import { HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import * as fromActions from '../remove-rating.actions';
import * as fromReducer from '../remove-rating.reducer';
import { RemoveRatingState } from '../remove-rating.reducer';

describe('REMOVE_RATING_REDUCER', () => {

  const initialState: RemoveRatingState = {
    removedRating: undefined,
    processing: false,
    error: undefined
  };

  describe('REMOVE_RATING', () => {

    it('should return new state with processing property set to true', () => {

      const bookId = 1;
      const userId = 1;

      const rating = new Rating(bookId, userId, 2);
      rating.id = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
      overview.id = 1;
      overview.addRating(rating);

      const action = fromActions.REMOVE_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, userId } });

      const newState = fromReducer.removeRatingReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });

  });

  describe('REMOVE_RATING_SUCCESS', () => {
    it('should return new state with processing property set to false and defined removedRating property', () => {

      const bookId = 1;
      const userId = 1;

      const rating = new Rating(bookId, userId, 2);
      rating.id = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
      overview.id = 1;
      overview.addRating(rating);

      const action = fromActions.REMOVE_RATING_SUCCESS({
        payload: { overview, removedRating: rating, userId }
      });

      const newState = fromReducer.removeRatingReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
      expect(newState.removedRating).toBeDefined();
    })

  });

  describe('REMOVE_RATING_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.REMOVE_RATING_FALIURE({ payload: { model: error } });

      const newState = fromReducer.removeRatingReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
