

import * as fromActions from '../authors/author-statistics.actions';
import * as fromReducer from '../authors/author-statistics.reducer';
import { Statistics } from "src/app/modules/api/ratings/statistics/models/statistics";
import { AuthorStatistics } from '../authors/author-statistics.reducer';

describe('AUTHOR_STATISTICS_REDUCER', () => {

  const initialState: AuthorStatistics = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };


  describe('SELECT_AUTHOR_STATISTICS', () => {
    it('should return new state with processing set to true', () => {

      const authorId = 1;

      const action = fromActions.SELECT_AUTHOR_STATISTICS({ payload: { authorId } });

      const newState = fromReducer.authorStatisticsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_AUTHOR_STATISTICS', () => {
    it('should return new state with updated entities', () => {

      const authorId = 1;

      const statistics: Statistics = {
        objectId: authorId,
        ratingsCount: 10,
        average: 5.00
      };

      const action = fromActions.FETCH_AUTHOR_STATISTICS({ payload: { statistics } });

      const newState = fromReducer.authorStatisticsReducer(initialState, action);

      expect(newState.entities[authorId]).toEqual(statistics);
    });
  });

  describe('FETCH_AUTHOR_STATISTICS_FALIURE', () => {
    it('should return new state defined error property', () => {

      const error = new Error();

      const action = fromActions.FETCH_AUTHOR_STATISTICS_FALIURE({ payload: { error } })

      const newState = fromReducer.authorStatisticsReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });


});
