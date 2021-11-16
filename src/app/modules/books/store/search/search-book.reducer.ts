import { createReducer, on, Action } from '@ngrx/store';
import * as searchBookAction from './search-book.actions';
import { Book } from '../../../api/books/models';
import { Query } from 'src/app/modules/shared/common/query';
import { ApiError } from 'src/app/modules/api/api-error.model';

export interface SearchBook {
  entities: Book[]
  processing: boolean,
  query: Query,
  error: ApiError
}

const initialState: SearchBook = {
  entities: [],
  processing: false,
  query: undefined,
  error: undefined
}

const reducer = createReducer(initialState,
  on(searchBookAction.START_FILTERING_BOOKS, (state, action) => ({ ...state, processing: true, query: action.payload.query })),
  on(searchBookAction.STOP_FILTERING_BOOKS, (state) => ({ ...state, processing: false })),
  on(searchBookAction.FETCH_FILTERED_BOOKS, (state, action) => ({ ...state, entities: action.payload.books, processing: false })),
  on(searchBookAction.FILTER_BOOK_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error, entities: [] })),
  on(searchBookAction.CLEAR_FILTERED_BOOKS, (state) => ({
    ...state, query: undefined, entities: undefined
  }))
);

export function searchBookReducer(state: SearchBook, action: Action) {
  return reducer(state, action);
}
