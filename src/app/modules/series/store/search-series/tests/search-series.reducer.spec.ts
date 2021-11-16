import { SearchSeriesState } from "../search-series.reducer";

import * as fromReducer from '../search-series.reducer';
import * as fromActions from '../search-series.actions';
import { SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { Series } from "src/app/modules/api/series/models/series.model";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('SEARCH_SERIES_REDUCER', () => {

  const initialState: SearchSeriesState = {
    entities: [],
    processing: false,
    query: undefined,
    error: undefined
  };

  describe('START_FILTERING_SERIES', () => {
    it('it should return new state with processing set to true', () => {

      const action = fromActions.START_FILTERING_SERIES({ payload: { query: SEARCH_QUERY('phrase') } });

      const newState = fromReducer.searchSeriesReducer(initialState, action);

      expect(newState).toBeTruthy();
    });

  });

  describe('FETCH_FILTERED_SERIES', () => {
    it('it should return new state with updated entities state', () => {

      const series = new Series('series');
      series.setSeriesId(1);

      const items = [series];

      const action = fromActions.FETCH_FILTERED_SERIES({ payload: { series: items } });

      const newState = fromReducer.searchSeriesReducer(initialState, action);

      expect(newState.entities).toEqual(items);

    });
  });

  describe('FILTER_SERIES_FALIURE', () => {
    it('should return new state with defined error property', () => {
      const error = new ApiError();

      const action = fromActions.FILTER_SERIES_FALIURE({ payload: { error } });

      const newState = fromReducer.searchSeriesReducer(initialState, action);

      expect(newState.error).toBeDefined();

    });

  });

});
