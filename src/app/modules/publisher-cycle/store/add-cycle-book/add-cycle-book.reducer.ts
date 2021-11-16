import { Action, createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { Book } from 'src/app/modules/api/books/models';
import { PublisherCycle } from 'src/app/modules/api/cycles/models/publisher-cycle.model';
import * as fromActions from './add-cycle-book.actions';

export interface AddPublisherCycleBookState {
  publisherCycle: PublisherCycle
  book: Book
  processing: boolean,
  error: ApiError
};

const initialState: AddPublisherCycleBookState = {
  publisherCycle: undefined,
  book: undefined,
  processing: false,
  error: undefined
};

const reducer = createReducer(initialState,
  on(fromActions.ADD_CYCLE_BOOK, (state, action) => {
    return { ...state, publisherCycle: action.payload.cycle, book: action.payload.book, processing: true }
  }),
  on(fromActions.ADD_CYCLE_BOOK_SUCCESS, (state) => {
    const cycle: PublisherCycle = state.publisherCycle;
    const book = state.book;
    cycle.addBook(book.identification.id);

    return { ...state, publisherCycle: cycle, processing: false }
  }),
  on(fromActions.ADD_CYCLE_BOOK_FALIURE, (state, action) => {
    return { ...state, processing: false, error: action.payload.model }
  })
);

export function addCycleBookReducer(state: AddPublisherCycleBookState, action: Action) {
  return reducer(state, action);
}
