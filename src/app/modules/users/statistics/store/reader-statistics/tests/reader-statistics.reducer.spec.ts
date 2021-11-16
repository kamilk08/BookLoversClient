
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ReaderStatistics } from 'src/app/modules/api/statistics/models/reader-statistics.model';
import * as fromActions from '../reader-statistics.actions';
import * as fromReducer from '../reader-statistics.reducer';
import { ReaderStatisticsState } from '../reader-statistics.reducer';

describe('READER_STATISTICS_REDUCER', () => {

  const initialState: ReaderStatisticsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };


  describe('SELECT_READER_STATISTICS', () => {
    it('should return new state with processing property set to true', () => {
      const readerId = 1;

      const action = fromActions.SELECT_READER_STATISTICS({ payload: { readerId } });

      const newState = fromReducer.readerStatisticsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    })
  });

  describe('FETCH_READER_STATISTICS', () => {
    it('should return new state with updated entities property', () => {

      const statistics: ReaderStatistics = new ReaderStatistics();
      statistics.readerId = 1;

      const action = fromActions.FETCH_READER_STATISTICS({ payload: { statistics } });

      const newState = fromReducer.readerStatisticsReducer(initialState, action);

      expect(newState.entities[statistics.readerId]).toEqual(statistics);
    })
  });

  describe('FETCH_READER_RATINGS_STATISTICS_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.FETCH_READER_STATISTICS_FALIURE({ payload: { error: new ApiError() } });

      const newState = fromReducer.readerStatisticsReducer(initialState, action);

      expect(newState.error).toBeDefined();
    })
  });

});
