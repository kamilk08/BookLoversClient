import { BooksPagination } from "../books-pagination.reducer";
import * as fromActions from '../books-pagination.actions';
import * as fromReducer from '../books-pagination.reducer';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";

describe('BOOKS_PAGINATION_REDUCER', () => {


  const initialState: BooksPagination = {
    pageResult: undefined,
    processing: false,
    error: undefined
  }

  it('select books page should return new state with processing set to true', () => {

    const action = fromActions.SELECT_BOOKS_PAGE({ payload: { query: DEFAULT_QUERY() } });

    const newState = fromReducer.booksPaginationReducer(initialState, action);

    expect(newState.processing).toBeTruthy();

  });

  it('set books page should return new state with defined pageResult property', () => {

    const pageResult: PageResult = {
      page: 0,
      pagesCount: 0,
      items: [],
      totalItems: 10
    };

    const action = fromActions.SET_BOOKS_PAGE({ payload: { pageResult } })

    const newState = fromReducer.booksPaginationReducer(initialState, action);

    expect(newState.pageResult).toBe(pageResult);

  });

})
