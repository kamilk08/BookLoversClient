import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './bookcases-with-book.actions';

export interface BookcasesWithBook {
  entities: { [bookId: number]: number[] }
  processing: boolean,
  error: any
}

const initialState: BookcasesWithBook = {
  entities: {},
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_BOOKCASES_WITH_BOOK, state => ({ ...state, processing: true })),
  on(fromActions.FETCH_BOOKCASE_WITH_BOOK, (state, action) => {
    const entities = fetchBookcasesWithBook(state.entities, action.payload.bookcasesIds, action.payload.bookId);
    return { ...state, entities: { ...entities }, processing: false }
  }),
  on(fromActions.BOOKCASE_WITH_BOOK_FETCH_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.model }))
);

export function bookcasesWithBookReducer(state: BookcasesWithBook, action: Action) {
  return reducer(state, action);
}

function fetchBookcasesWithBook(state: { [bookId: number]: number[] }, bookcasesIds: number[], bookId: number) {
  return bookcasesIds.reduce((pv: { [id: number]: number[] }, cv: number) => {
    return {
      ...pv,
      [bookId]: bookcasesIds
    }
  },
    {
      ...state
    })
}
