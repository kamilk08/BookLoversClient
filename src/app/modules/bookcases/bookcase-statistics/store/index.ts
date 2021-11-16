import * as fromBookcasesWithBook from './bookcases-with-book.reducer';
import * as fromShelfsWithBook from './shelves-with-book.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface BookcaseStatisticsState {
  bookcasesWithBook: fromBookcasesWithBook.BookcasesWithBook,
  shelfsWithBook: fromShelfsWithBook.ShelvesWithBook
}

const reducersMap: ActionReducerMap<BookcaseStatisticsState> = {
  bookcasesWithBook: fromBookcasesWithBook.bookcasesWithBookReducer,
  shelfsWithBook: fromShelfsWithBook.shelfsWithBookReducer
};

const reducer = combineReducers(reducersMap);

export function bookcaseStatisticsModuleReducer(state: BookcaseStatisticsState, action: Action) {
  return reducer(state, action);
}

export const bookcaseStatisticsModuleState = createFeatureSelector('bookcase-statistics');
