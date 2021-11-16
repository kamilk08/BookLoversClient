import { BrowseCriteria } from 'src/app/modules/api/browse/models/browse-criteria.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import * as fromActions from '../browse.actions';
import * as fromReducer from '../browse.reducer';
import { BrowseState } from '../browse.reducer';

describe("BROWSE_REDUCER", () => {

  const initialState: BrowseState = {
    pageResult: undefined,
    processing: false,
    error: undefined
  };

  describe('START_BROWSING', () => {
    it('should return new state with processing property set to true', () => {

      const criteria = BrowseCriteria.defaultCriteria();

      const action = fromActions.START_BROWSING({ payload: { model: criteria } });

      const newState = fromReducer.browseReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_BROWSING_RESULT', () => {

    it('should return new state with defined pageResult property', () => {

      let pageResult: PageResult = {
        items: [],
        page: 0,
        pagesCount: 0,
        totalItems: 0
      };

      const action = fromActions.FETCH_BROWSING_RESULTS({ payload: { pageResult } });

      const newState = fromReducer.browseReducer(initialState, action);

      expect(newState.pageResult).toEqual(pageResult);
    })

  });

});
