
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { DEFAULT_QUERY } from 'src/app/modules/shared/common/query';
import * as fromActions from '../followers-pagination.actions';
import * as fromReducer from '../followers-pagination.reducer';
import { FollowersPaginationState } from '../followers-pagination.reducer';

describe('FOLLOWERS_PAGINATION_REDUCER', () => {

  const initialState: FollowersPaginationState = {
    entities: {},
    ids: [],
    processing: false,
    error: undefined
  };

  describe('SELECT_READER_FOLLOWERS_PAGE', () => {
    it('should return new state with processing property set to true', () => {

      const readerId = 1;
      const query = DEFAULT_QUERY();

      const action = fromActions.SELECT_READER_FOLLOWERS_PAGE({ payload: { readerId, query } });

      const newState = fromReducer.followersPaginationReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('SET_READER_FOLLOWERS_PAGE', () => {
    it('should return new state with updated entities property', () => {

      const readerId = 1;

      const pageResult: PageResult = {
        items: [2],
        pagesCount: 1,
        page: 0,
        totalItems: 1
      };

      const action = fromActions.SET_READER_FOLLOWER_PAGE({ payload: { readerId, pageResult } })

      const newState = fromReducer.followersPaginationReducer(initialState, action);

      expect(newState.entities[readerId]).toEqual(pageResult);

    });
  })

});
