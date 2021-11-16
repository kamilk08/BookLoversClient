import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import * as fromActions from './tickets-pagination.actions';

export interface TicketsPaginationState {
  pageResult: PageResult,
  processing: boolean,
  error: ApiError
};

const initialState: TicketsPaginationState = {
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_USER_TICKETS_PAGE, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.SELECT_MANAGEABLE_TICKETS_PAGE, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.FETCH_TICKETS_PAGE, (state, action) => {
    return { ...state, pageResult: action.payload.pageResult, processing: false }
  }),
  on(fromActions.TICKETS_PAGE_ERROR, (state, action) => {
    return { ...state, processing: false, error: action.payload.error }
  })
);

export function ticketsPaginationReducer(state: TicketsPaginationState, action: Action) {
  return reducer(state, action);
}
