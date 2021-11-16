import { PageResult } from 'src/app/modules/shared/common/page-result';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './activities-pagination.actions';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface TimeLineActivitiesPagination {
  pageResult: PageResult
  processing: boolean
  error: ApiError
}

const initialState: TimeLineActivitiesPagination = {
  pageResult: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_ACTIVITIES_PAGE, state => ({ ...state, processing: true })),
  on(fromActions.SET_ACTIVITIES_PAGE, (state, action) => ({ ...state, pageResult: action.payload.pageResult })),
  on(fromActions.SET_ACTIVITIES_PAGE_FALIURE, (state, action) => ({ ...state, error: action.payload.error, processing: false })),
  on(fromActions.END_SELECTING, (state) => ({ ...state, processing: false }))
);

export function activitiesPaginationReducer(state: TimeLineActivitiesPagination, action: Action) {
  return reducer(state, action);
}
