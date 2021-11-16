import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from './shelves-with-book.actions';

export interface ShelvesWithBook {
  items: []
  processing: boolean,
  error: any
}

const initialState: ShelvesWithBook = {
  items: [],
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.SELECT_SHELVES_WITH_BOOK, (state => ({ ...state, processing: true }))),
  on(fromActions.FETCH_SHELVES_WITH_BOOK, (state, action) => {
    const paginatedShelfs = action.payload.statistics.items;
    return { ...state, processing: false, items: paginatedShelfs }
  }),
  on(fromActions.FETCH_SHELVES_WITH_BOOK_FALIURE, (state, action) => ({ ...state, processing: false, error: action.payload.error }))
);

export function shelfsWithBookReducer(state: ShelvesWithBook, action: Action) {
  return reducer(state, action);
}

