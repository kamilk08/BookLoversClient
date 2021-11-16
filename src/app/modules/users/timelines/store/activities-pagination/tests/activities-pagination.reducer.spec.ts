
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { DEFAULT_QUERY } from 'src/app/modules/shared/common/query';
import * as fromActions from '../activities-pagination.actions';
import * as fromReducer from '../activities-pagination.reducer';
import { TimeLineActivitiesPagination } from '../activities-pagination.reducer';

describe('ACTIVITIES_PAGINATION_REDUCER', () => {

  const initialState: TimeLineActivitiesPagination = {
    pageResult: undefined,
    processing: false,
    error: undefined
  };

  describe('SELECT_ACTIVITIES_PAGE', () => {
    it('should return new state with processing property set to true', () => {

      const timelineId = 1;

      const action = fromActions.SELECT_ACTIVITIES_PAGE({ payload: { timelineId, query: DEFAULT_QUERY(), hidden: true } });

      const newState = fromReducer.activitiesPaginationReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('SET_ACTIVITIES_PAGE', () => {
    it('should return new state with updated pageResult property and processing set to false', () => {

      const pageResult: PageResult = {
        page: 0,
        pagesCount: 0,
        items: [],
        totalItems: 0
      };

      const action = fromActions.SET_ACTIVITIES_PAGE({ payload: { pageResult } });

      const newState = fromReducer.activitiesPaginationReducer(initialState, action);

      expect(newState.pageResult).toEqual(pageResult);
      expect(newState.processing).toBeFalsy();

    });
  });

  describe('SET_ACTIVITIES_PAGE_FALIURE', () => {
    it('should return new state with defined error property', () => {

      const error = new ApiError();

      const action = fromActions.SET_ACTIVITIES_PAGE_FALIURE({ payload: { error } });

      const newState = fromReducer.activitiesPaginationReducer(initialState, action);

      expect(newState.error).toBeDefined();
    });
  });

});
