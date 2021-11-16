import { Statistics } from 'src/app/modules/api/ratings/statistics/models/statistics';
import * as fromActions from '../publisher/publisher-statistics.actions';
import * as fromRedeucer from '../publisher/publisher-statistics.reducer';
import { PublisherStatistics } from '../publisher/publisher-statistics.reducer';

describe('PUBLISHER_STATISTICS_REDUCER', () => {

  const initialState: PublisherStatistics = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_PUBLISHER_STATISTICS', () => {
    it('should return new state with processing set to true', () => {

      const publisherId = 1;

      const action = fromActions.SELECT_PUBLISHER_STATISTICS({ payload: { publisherId } });

      const newState = fromRedeucer.publisherStatisticsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();

    });
  });

  describe('FETCH_PUBLISHER_STATISTICS', () => {
    it('should return new state with updated entites', () => {

      const publisherId = 1;

      const statistics: Statistics = {
        objectId: publisherId,
        ratingsCount: 10,
        average: 5.00
      }

      const action = fromActions.FETCH_PUBLISHER_STATISTICS({ payload: { statistics } });

      const newState = fromRedeucer.publisherStatisticsReducer(initialState, action);

      expect(newState.entities[publisherId]).toEqual(statistics);

    });
  });

});
