import { createReducer, on, Action } from '@ngrx/store';
import { fetchSingle, fetchMany } from 'src/app/modules/shared/common/store-extensions';
import * as fromActions from './book.actions';
import { Book } from '../../api/books/models/book.model';
import { ApiError } from '../../api/api-error.model';


export interface Books {
  entities: { [id: number]: Book }
  ids: number[]
  processing: boolean
  error: any
}

const initialState: Books = {
  entities: {},
  ids: [],
  processing: false,
  error: undefined
}

const reducer = createReducer(initialState,
  on(fromActions.SELECT_BOOK, state => ({ ...state, processing: true })),
  on(fromActions.SELECT_BOOK_BY_GUID, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_BOOK, (state, action) => {
    const newState = fetchSingle((book: Book) => book.identification.id, state, action.payload.book);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.SELECT_MUTLTIPLE_BOOKS_BY_ID, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_MULTIPLE_BOOKS, (state, action) => {
    const newState = fetchMany((book: Book) => book.identification.id, state, action.payload.books);
    return { ...state, entities: newState.entities, ids: newState.ids, processing: false }
  }),
  on(fromActions.FETCH_BOOK_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model })),
  on(fromActions.BOOK_NOT_FOUND, (state, action) => ({ ...state, error: action.payload.model, processing: false }))
);

export function booksReducer(state: Books, action: Action) {
  return reducer(state, action);
}
