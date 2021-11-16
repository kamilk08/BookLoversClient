import { SearchAuthor } from "../search-author.reducer";

import * as fromActions from '../search-author.actions';
import * as fromReducer from '../search-author.reducer';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";

describe('search author reducer', () => {

  const initialState: SearchAuthor = {
    entities: [],
    isFiltered: false,
    query: undefined,
    error: undefined
  };

  describe('START_FILTERING_AUTHORS', () => {
    it('should return new state with isFiltered set to true and defined query property', () => {

      const action = fromActions.START_FILTERING_AUTHORS({ payload: { query: DEFAULT_QUERY() } });

      const newState = fromReducer.searchAuthorReducer(initialState, action);

      expect(newState.isFiltered).toBeTruthy();
      expect(newState.query).toBe(action.payload.query);
    });
  });

  describe('CLEAR_SEARCH_RESULTS', () => {
    it('should return new state with isFiltered and query property set to undefined', () => {

      const action = fromActions.CLEAR_SEARCH_RESULTS();

      const newState = fromReducer.searchAuthorReducer(initialState, action);

      expect(newState.isFiltered).toBeFalsy();
      expect(newState.query).toBeUndefined();

    })
  })


});
