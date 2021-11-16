
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Series } from 'src/app/modules/api/series/models/series.model';
import * as fromActions from '../add-series.actions';
import * as fromReducer from '../add-series.reducer';

import { AddSeriesState } from '../add-series.reducer';

describe('ADD_SERIES_REDUCER', () => {

  const initialState: AddSeriesState = {
    series: undefined,
    processing: false,
    error: undefined
  };

  describe('ADD_SERIES', () => {
    it('should return new state with processing set to true', () => {
      const series = new Series('name');

      const action = fromActions.ADD_SERIES({ payload: { series } });

      const newState = fromReducer.addSeriesReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });

  });

  describe('ADD_SERIES_SUCCESS', () => {
    it('should return new state with updated series entity', () => {

      const series = new Series('name');

      const addSeriesAction = fromActions.ADD_SERIES({ payload: { series } });

      const addSeriesState = fromReducer.addSeriesReducer(initialState, addSeriesAction);

      const action = fromActions.ADD_SERIES_SUCCESS({ payload: { seriesId: 1 } });

      const newState = fromReducer.addSeriesReducer(addSeriesState, action);

      expect(newState.series.identification.id).toEqual(action.payload.seriesId);
    });

  });

  describe('ADD_SERIES_FALIURE', () => {

    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.ADD_SERIES_FALIURE({ payload: { model: error } });

      const newState = fromReducer.addSeriesReducer(initialState, action);

      expect(newState.error).toEqual(error);
    })

  });


});
