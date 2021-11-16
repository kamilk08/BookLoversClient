import { ApiError } from 'src/app/modules/api/api-error.model';
import * as fromActions from '../grouped-ratings.actions';
import * as fromReducer from '../grouped-ratings.reducer';
import { GroupedRatings } from '../grouped-ratings.reducer';

describe('GROUPED_RATINGS_REDUCER', () => {

  const initialState: GroupedRatings = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  describe('SELECT_GROUPED_RATINGS', () => {
    it('should return new state with processing property set to true', () => {

      const bookId = 1;

      const action = fromActions.SELECT_GROUPED_RATINGS({ payload: { bookId } });

      const newState = fromReducer.groupedRatingsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_GROUPED_RATINGS', () => {
    it('should return new state with book ratings entities property', () => {

      const bookId = 1;

      const groupedRatings = {
        1: 1,
        2: 2
      };

      const action = fromActions.FETCH_GROUPED_RATINGS({ payload: { bookId, groupedRatings: groupedRatings } });

      const newState = fromReducer.groupedRatingsReducer(initialState, action);

      expect(newState.entities[bookId]).toBe(groupedRatings);
    });

  });

  describe('UPDATE_GROUPED_RATINGS', () => {
    it('should return new state with updated grouped ratings', () => {

      const bookId = 1;

      const groupedRatings = {
        1: 1,
        2: 2
      };

      const fetchAction = fromActions.FETCH_GROUPED_RATINGS({ payload: { bookId, groupedRatings: groupedRatings } });

      const newState = fromReducer.groupedRatingsReducer(initialState, fetchAction);

      const updateAction = fromActions.UPDATE_GROUPED_RATINGS({ payload: { bookId, oldRating: 1, newRating: 2 } })

      const stateAfterUpdate = fromReducer.groupedRatingsReducer(newState, updateAction);

      expect(stateAfterUpdate.entities[bookId][1]).toBe(0);
      expect(stateAfterUpdate.entities[bookId][2]).toBe(3);
    });

  });

  describe('FETCH_GROUPED_RATINGS_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.FETCH_GROUPED_RATINGS_FALIURE({ payload: { error } })

      const newState = fromReducer.groupedRatingsReducer(initialState, action);

      expect(newState.error).toBeDefined();
    })

  })

})
