import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';

import * as fromActions from './remove-cycle-book.actions';

export interface RemoveCycleBookState {
  cycle: PublisherCycle
  book: Book
  processing: boolean
  error: ApiError
}

const initialState: RemoveCycleBookState = {
  cycle: undefined,
  book: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.REMOVE_CYCLE_BOOK, (state, action) => {
    return { ...state, cycle: action.payload.cycle, book: action.payload.book, processing: true }
  }),
  on(fromActions.REMOVE_CYCLE_BOOK_SUCCESS, (state) => {
    const cycle = state.cycle;
    const book = state.book;

    cycle.removeBook(book.identification.id);

    return { ...state, cycle: cycle, processing: false }
  }),
  on(fromActions.REMOVE_CYCLE_BOOK_FALIURE, (state, action) => {
    return { ...state, error: action.payload.model, processing: false }
  })
);

export function removeCycleBookReducer(state: RemoveCycleBookState, action: Action) {
  return reducer(state, action);
}
