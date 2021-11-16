import { BookcasesWithBook } from "../bookcases-with-book.reducer";

import * as fromActions from '../bookcases-with-book.actions';
import * as fromReducer from '../bookcases-with-book.reducer';
import { ApiError } from "src/app/modules/api/api-error.model";

describe('BOOKCASES_WITH_BOOK_REDUCER', () => {

  const initialState: BookcasesWithBook = {
    entities: {},
    processing: false,
    error: undefined
  };

  describe('SELECT_BOOKCASES_WITH_BOOK', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_BOOKCASES_WITH_BOOK({ payload: { bookId: 1 } });

      const newState = fromReducer.bookcasesWithBookReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_BOOKCASE_WITH_BOOK', () => {
    it('should return new state with updated entities property', () => {

      const bookId = 1;

      const action = fromActions.FETCH_BOOKCASE_WITH_BOOK({ payload: { bookcasesIds: [1], bookId: 1 } });

      const newState = fromReducer.bookcasesWithBookReducer(initialState, action);

      expect(newState.entities[bookId]).toEqual(action.payload.bookcasesIds);
    });

  });


  describe('BOOKCASE_WITH_BOOK_FETCH_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.BOOKCASE_WITH_BOOK_FETCH_FALIURE({ payload: { model: error } });

      const newState = fromReducer.bookcasesWithBookReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });

  });

});
