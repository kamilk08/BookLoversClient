import { Query } from 'src/app/modules/shared/common/query';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './search-author.actions';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface SearchAuthor {
  entities: Author[]
  isFiltered: boolean
  query: Query
  error: ApiError
}

const initialState: SearchAuthor = {
  entities: [],
  isFiltered: false,
  query: undefined,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.START_FILTERING_AUTHORS, (state, action) => ({ ...state, isFiltered: true, query: action.payload.query })),
  on(fromActions.FETCH_FILTERED_AUTHORS, (state, action) => {
    return { ...state, entities: action.payload.authors }
  }),
  on(fromActions.STOP_FILTERING_AUTHORS, (state) => ({ ...state, isFiltered: false })),
  on(fromActions.CLEAR_SEARCH_RESULTS, (state) => ({
    ...state, entities: undefined, query: undefined
  })),
  on(fromActions.FILTER_AUTHOR_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, isFiltered: false }
  })
);

export function searchAuthorReducer(state: SearchAuthor, action: Action) {
  return reducer(state, action);
}
