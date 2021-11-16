import { SearchBook } from "../search-book.reducer"
import * as fromActions from '../search-book.actions';
import * as fromReducer from '../search-book.reducer';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('SEARCH_BOOK_REDUCER', () => {

  const initialState: SearchBook = {
    entities: [],
    processing: false,
    query: undefined,
    error: undefined
  }

  describe('START_FILTERING_BOOKS', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.START_FILTERING_BOOKS({ payload: { query: DEFAULT_QUERY() } });

      const newState = fromReducer.searchBookReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    })

  });

  describe('STOP_FILTERING_BOOKS', () => {
    it('should return new state with processing property set to false', () => {

      const action = fromActions.STOP_FILTERING_BOOKS();

      const newState = fromReducer.searchBookReducer(initialState, action);

      expect(newState.processing).toBeFalsy();

    });

  });

  describe('FILTER_BOOK_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const action = fromActions.FILTER_BOOK_FALIURE({ payload: { error: new ApiError() } });

      const newState = fromReducer.searchBookReducer(initialState, action);

      expect(newState.error).not.toBeNull();
      expect(newState.error).toBeDefined();
    })

  });

  describe('FETCH_FILTERED_BOOKS', () => {
    it('should return new state with defined entities property and processing set to false', () => {

      const action = fromActions.FETCH_FILTERED_BOOKS({ payload: { books: [] } });

      const newState = fromReducer.searchBookReducer(initialState, action);

      expect(newState.entities).toBe(action.payload.books);
      expect(newState.processing).toBeFalsy();
    })

  });

  describe('CLEAR_FILTERED_BOOKS', () => {
    it('should return new state with query and entities not defined', () => {

      const action = fromActions.CLEAR_FILTERED_BOOKS();

      const newState = fromReducer.searchBookReducer(initialState, action);

      expect(newState.query).not.toBeDefined();
      expect(newState.entities).not.toBeDefined();

    });
  });

})
