import { ReaderFollowingsPaginationState } from "../followings-pagination.reducer";

import * as fromActions from '../followings-pagination.actions';
import * as fromReducer from '../followings-pagination.reducer';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";

describe('FOLLOWINGS_PAGINATION_REDUCER', () => {

  const initialState: ReaderFollowingsPaginationState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  }

  describe('SELECT_FOLLOWINGS_PAGE', () => {
    it('it should return new state with processing property set to true', () => {

      const readerId = 1;
      const query = DEFAULT_QUERY();

      const action = fromActions.SELECT_READER_FOLLOWINGS_PAGE({ payload: { readerId, query } });

      const newState = fromReducer.readerFollowingsPageReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('SET_READER_FOLLOWINGS_PAGE', () => {
    it('it should return new state with updated entities property', () => {

      const readerId = 1;
      const pageResult: PageResult = {
        items: [],
        totalItems: 0,
        page: 0,
        pagesCount: 1
      }

      const action = fromActions.SET_READER_FOLLOWINGS_PAGE({ payload: { readerId, pageResult } });

      const newState = fromReducer.readerFollowingsPageReducer(initialState, action);

      expect(newState.entities[readerId]).toEqual(pageResult);
    });
  });

});
