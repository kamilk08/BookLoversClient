import * as fromActions from './bookcase-pagination.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface BookcasePage {
  ids: number[]
  processing: boolean;
  pageResult: PageResult;
  error: ApiError
}

const initialState: BookcasePage = {
  ids: [],
  processing: false,
  pageResult: undefined,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_BOOKCASE_PAGE, state => ({ ...state, processing: true })),
  on(fromActions.SET_BOOKCASE_PAGE, (state, action) => {
    return { ...state, ids: action.payload.pageResult.items, pageResult: action.payload.pageResult, processing: false };
  }),
  on(fromActions.BOOKCASE_PAGE_ACTION_FALIURE, state => ({ ...state, ids: [], pageResult: undefined, processing: false }))
)

export function bookcasePaginationReducer(state: BookcasePage, action: Action) {
  return reducer(state, action);
}
