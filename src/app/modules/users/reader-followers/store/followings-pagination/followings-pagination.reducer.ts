import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import * as fromActions from './followings-pagination.actions';

export interface ReaderFollowingsPaginationState {
  entities: { [readerId: number]: PageResult },
  ids: number[]
  processing: boolean,
  error: ApiError
}

const initialState: ReaderFollowingsPaginationState = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_READER_FOLLOWINGS_PAGE, (state) => {
    return { ...state, processing: true }
  }),
  on(fromActions.SET_READER_FOLLOWINGS_PAGE, (state, action) => {
    const ids = state.ids;
    if (!ids.includes(action.payload.readerId))
      ids.push(action.payload.readerId);

    return { ...state, entities: { ...state.entities, [action.payload.readerId]: action.payload.pageResult }, ids: ids, processing: false }
  }),
  on(fromActions.SET_READER_FOLLOWINGS_PAGE_FALIURE, (state, action) => {
    return { ...state, error: action.payload.error }
  })
);

export function readerFollowingsPageReducer(state, action) {
  return reducer(state, action);
}
