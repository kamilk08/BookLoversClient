import { ReaderRatingsStatisticsState } from "../ratings-statistics.reducer";

import * as fromActions from '../ratings-statistics.actions';
import * as fromReducer from '../ratings-statistics.reducer';
import { ReaderRatings } from "src/app/modules/api/statistics/models/reader-ratings-statistics.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('RATINGS_STATISTICS_REDUCER', () => {

  const initialState: ReaderRatingsStatisticsState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_READER_RATINGS_STATISTICS', () => {
    it('should return new state with processing property set to true', () => {
      const readerId = 1;

      const action = fromActions.SELECT_READER_RATINGS_STATISTICS({ payload: { readerId } });

      const newState = fromReducer.readerRatingsStatisticsReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    })
  });

  describe('SELECT_READER_RATINGS_STATISTICS', () => {
    it('should return new state with updated entities propertyF', () => {

      const statistics: ReaderRatings = new ReaderRatings();
      statistics.readerId = 1;
      statistics.ratingsCount = 1;
      statistics.groupedRatings = { 1: 1 };

      const action = fromActions.FETCH_READER_RATINGS_STATISTICS({ payload: { statistics } });

      const newState = fromReducer.readerRatingsStatisticsReducer(initialState, action);

      expect(newState.entities[statistics.readerId]).toEqual(statistics);
    })
  });

  describe('FETCH_READER_RATINGS_STATISTICS_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.FETCH_READER_RATINGS_STATISTICS_FALIURE({ payload: { error: new ApiError() } });

      const newState = fromReducer.readerRatingsStatisticsReducer(initialState, action);

      expect(newState.error).toBeDefined();
    })
  });

})
