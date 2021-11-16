import * as fromBooks from './book.reducer';
import * as fromSearchBook from './search/search-book.reducer';
import * as fromBooksPagination from './pagination/books-pagination.reducer';
import * as fromWebPage from './webpage/book-webpage.reducer';
import * as fromRemoveBook from './remove-book/remove-book.reducer';
import { ActionReducerMap, combineReducers, Action, createFeatureSelector } from '@ngrx/store';

export interface BooksModuleState {
  books: fromBooks.Books
  searchBook: fromSearchBook.SearchBook,
  pagination: fromBooksPagination.BooksPagination,
  webPage: fromWebPage.BookWebPageState,
  removeBook: fromRemoveBook.RemoveBookState
}

const reducersMap: ActionReducerMap<BooksModuleState> = {
  books: fromBooks.booksReducer,
  searchBook: fromSearchBook.searchBookReducer,
  pagination: fromBooksPagination.booksPaginationReducer,
  webPage: fromWebPage.webPageReducer,
  removeBook: fromRemoveBook.removeBookReducer
};

const reducer = combineReducers(reducersMap);

export function booksStateReducer(state: BooksModuleState, action: Action) {
  return reducer(state, action);
}

export const booksModuleState = createFeatureSelector<BooksModuleState>('books');
