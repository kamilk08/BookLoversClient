import { SeriesState } from "../series.reducer";

import * as fromActions from '../series.actions';
import * as fromReducer from '../series.reducer';
import { Series } from "src/app/modules/api/series/models/series.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('SERIES_REDUCER', () => {

  const initialState: SeriesState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_SERIES', () => {
    it('should return new state with processing property set to true', () => {
      const id = 1;

      const action = fromActions.SELECT_SERIES({ payload: { id } });

      const newState = fromReducer.seriesReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_SERIES', () => {
    it('should return new state with updated entities property', () => {

      const series = new Series('name');
      series.setSeriesId(1);

      const action = fromActions.FETCH_SERIES({ payload: { series } });

      const newState = fromReducer.seriesReducer(initialState, action);

      expect(newState.entities[series.identification.id]).toEqual(series);
    });
  });

  describe('FETCH_MULTIPLE_SERIES', () => {
    it('should return new state with updated entities property', () => {

      const series = new Series('name');
      series.setSeriesId(1);

      const action = fromActions.FETCH_MULTIPLE_SERIES({ payload: { series: [series] } });

      const newState = fromReducer.seriesReducer(initialState, action);

      expect(newState.entities[series.identification.id]).toEqual(series);
    });
  });

  describe('FETCH_SERIES_ERROR', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.FETCH_SERIES_FALIURE({ payload: { model: error } });

      const newState = fromReducer.seriesReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
