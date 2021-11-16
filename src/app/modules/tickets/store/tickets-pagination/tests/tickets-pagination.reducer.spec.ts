import { TicketsPaginationState } from "../tickets-pagination.reducer";

import * as fromActions from '../tickets-pagination.actions';
import * as fromReducer from '../tickets-pagination.reducer';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";

describe('TICKETS_PAGINATION_REDUCER', () => {

  const initialState: TicketsPaginationState = {
    pageResult: undefined,
    processing: false,
    error: undefined
  };

  describe('SELECT_USER_TICKETS_PAGE', () => {
    it('should return new state with processing property set to true', () => {

      const action = fromActions.SELECT_USER_TICKETS_PAGE({ payload: { query: DEFAULT_QUERY(), solved: true } });

      const newState = fromReducer.ticketsPaginationReducer(initialState, action);

      expect(newState.processing).toBeTruthy();
    });
  });

  describe('FETCH_TICKETS_PAGE', () => {
    it('should return new state', () => {

      const pageResult: PageResult = {
        items: [],
        page: 0,
        totalItems: 0,
        pagesCount: 0
      };

      const action = fromActions.FETCH_TICKETS_PAGE({ payload: { pageResult } });

      const newState = fromReducer.ticketsPaginationReducer(initialState, action);

      expect(newState.pageResult).toEqual(pageResult);
    });
  });


});
