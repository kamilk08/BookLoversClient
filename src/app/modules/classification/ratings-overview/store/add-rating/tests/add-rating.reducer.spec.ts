import { UUID } from 'angular2-uuid';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import * as fromActions from '../add-rating.actions';
import * as fromReducer from '../add-rating.reducer';
import { AddRatingState } from '../add-rating.reducer';

describe('ADD_RATING_REDUCER', () => {

  const initialState: AddRatingState = {
    rating: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_RATING', () => {
    it('should return new state with processing set to true', () => {
      const bookId = 1;
      const userId = 1;

      const rating = new Rating(bookId, userId, 4);

      const action = fromActions.ADD_RATING({
        payload: {
          book: { id: 1, guid: UUID.UUID() }, rating,
          bookcaseGuid: UUID.UUID()
        }
      });

      const newState = fromReducer.addRatingReducer(initialState, action);
      expect(newState.processing).toBeTruthy();
    });
  });

  describe('ADD_RATING_SUCCESS', () => {
    it('should return new state with processing set to false', () => {

      const bookId = 1;
      const userId = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
      overview.id = 1;

      const rating = new Rating(bookId, userId, 4);
      rating.id = 1;

      const action = fromActions.ADD_RATING_SUCCESS({ payload: { overview, rating } });

      const newState = fromReducer.addRatingReducer(initialState, action);

      expect(newState.processing).toBeFalsy();
    });

  })




})
