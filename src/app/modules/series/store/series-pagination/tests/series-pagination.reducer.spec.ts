import { SeriesPaginationState } from "../series-pagination.reducer";

import * as fromActions from '../series-pagination.actions';
import * as fromReducer from '../series-pagination.reducer';
import { PageResult } from "src/app/modules/shared/common/page-result";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { Series } from "src/app/modules/api/series/models/series.model";

describe('SERIES_PAGINATION_REDUCER', () => {

  const initialState: SeriesPaginationState = {
    entities: [],
    processing: false,
    pageResult: undefined,
    error: undefined
  };

  describe('SELECT_SERIES_BY_AUTHOR', () => {
    it('should return new state with processing property set to true', () => {

      const authorId = 1;

      const action = fromActions.SELECT_SERIES_BY_AUTHOR({ payload: { authorId, query: DEFAULT_QUERY() } });

      const newState = fromReducer.seriesPaginationReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('SET_SERIES_PAGE', () => {
    it('should return new state with updated pageResult property', () => {

      const series = new Series('series');
      series.setSeriesId(1);

      const pageResult: PageResult = {
        items: [series],
        page: 0,
        totalItems: 1,
        pagesCount: 1
      }

      const action = fromActions.SET_SERIES_PAGE({ payload: { series: [], pageResult } });

      const newState = fromReducer.seriesPaginationReducer(initialState, action);

      expect(newState.pageResult).toEqual(pageResult);
    });
  });

});
