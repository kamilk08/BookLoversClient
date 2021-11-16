import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import * as fromActions from '../ratings.actions';
import * as fromReducer from '../ratings.reducer';
import { Ratings } from '../ratings.reducer';

describe('RATINGS_REDUCER', () => {
  const initialState: Ratings = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  describe('SELECT_RATING', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_RATING({ payload: { bookId: 1, userId: 1 } });

      const newState = fromReducer.ratingsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_RATING', () => {
    it('should return new state with previously defined rating', () => {

      const bookId = 1;
      const userId = 1;
      const stars = 4;

      const rating = new Rating(bookId, userId, stars);
      rating.id = 1;

      const action = fromActions.FETCH_RATING({ payload: { rating } });

      const newState = fromReducer.ratingsReducer(initialState, action);

      expect(newState.entities[rating.id]).toBeTruthy();

    });
  });

  describe('FETCH_MULTIPLE_RATINGS', () => {
    it('should return new state with previously defined ratings', () => {

      const bookId = 1;
      const userId = 1;
      const stars = 4;

      const rating = new Rating(bookId, userId, stars);
      rating.id = 1

      const action = fromActions.FETCH_MULTIPLE_RATINGS({ payload: { ratings: [rating] } });

      const newState = fromReducer.ratingsReducer(initialState, action);

      expect(newState.entities[rating.id]).toBeTruthy();
    })
  })

  describe('UPSERT_RATING', () => {
    it('should return new state with updated rating', () => {

      const bookId = 1;
      const userId = 1;
      const stars = 4;

      const rating = new Rating(bookId, userId, stars);
      rating.id = 1

      const fetchAction = fromActions.FETCH_RATING({ payload: { rating } });

      let newState = fromReducer.ratingsReducer(initialState, fetchAction);

      const action = fromActions.UPSERT_RATING({ payload: { rating, stars: 5 } });

      newState = fromReducer.ratingsReducer(newState, action);

      expect(newState.entities[rating.id].stars).toBe(action.payload.stars);
    })

  })

});
