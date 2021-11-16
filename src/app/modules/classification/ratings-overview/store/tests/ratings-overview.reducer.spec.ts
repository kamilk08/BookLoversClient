import { UUID } from 'angular2-uuid';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import * as fromActions from '../ratings-overview.actions';
import * as fromReducer from '../ratings-overview.reducer';
import { RatingsOverviews } from '../ratings-overview.reducer';

describe('RATINGS_OVERVIEW_REDUCER', () => {

  const initialState: RatingsOverviews = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_RATINGS_OVERVIEW', () => {
    it('should return new state with processing property set to true', () => {
      const bookId = 1;

      const action = fromActions.SELECT_RATINGS_OVEREVIEW({ payload: { bookId } });

      const newState = fromReducer.overviewReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_OVERVIEW', () => {
    it('it should return new state with new ratings entity', () => {
      const bookId = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() });
      overview.id = 1;

      const action = fromActions.FETCH_OVERVIEW({ payload: { overview } });

      const newState = fromReducer.overviewReducer(initialState, action);

      expect(newState.entities[overview.id]).toEqual(overview);
    });
  });

  describe('FETCH_MULTIPLE_OVERVIEWS', () => {
    it('should return new state with new ratings entity', () => {
      const bookId = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() });
      overview.id = 1;

      const items = [overview];

      const action = fromActions.FETCH_MULTIPLE_OVERVIEWS({ payload: { overviews: items } });

      const newState = fromReducer.overviewReducer(initialState, action);

      expect(newState.entities[overview.id]).toEqual(overview);
    });
  });
});
