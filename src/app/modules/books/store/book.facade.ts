import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIndex from './index';
import * as fromSelectors from './module.selectors';
import { SELECT_BOOK, SELECT_MUTLTIPLE_BOOKS_BY_ID, SELECT_BOOK_BY_GUID, SELECT_MULTIPLE_BOOKS_BY_GUID } from './book.actions';
import { CLEAR_FILTERED_BOOKS, START_FILTERING_BOOKS } from './search/search-book.actions';
import { UUID } from 'angular2-uuid';
import { Query } from '../../shared/common/query';
import { Book } from '../../api/books/models';
import { REMOVE_BOOK } from './remove-book/remove-book.actions';


@Injectable()
export class BookFacade {

  public readonly bookById$ = (id: number) => this.store.select(fromSelectors.getBookById(id));
  public readonly bookByGuid$ = (guid: UUID) => this.store.select(fromSelectors.getBookByGuid(guid));
  public readonly multipleBooks$ = (bookIds: number[]) => this.store.select(fromSelectors.multipleBooks(bookIds));

  public readonly bookTitle$ = (id: number) => this.store.select(fromSelectors.bookTitle(id));

  public readonly isProcessing$ = this.store.select(fromSelectors.isProcessing);
  public readonly filteredBooksByTitle$ = this.store.select(fromSelectors.searchedBooksByTitle);

  public readonly filteringBooks$ = this.store.select(fromSelectors.isBookSearched);
  public readonly currentQuery$ = this.store.select(fromSelectors.searchQuery);
  public readonly nextPageProcessing$ = this.store.select(fromSelectors.nextPageProcessing);

  public readonly error$ = this.store.select(fromSelectors.error)

  constructor(private store: Store<fromIndex.BooksModuleState>) { }

  public selectBook(bookId: number) {
    this.store.dispatch(SELECT_BOOK({ payload: { bookId } }))
  }

  public selectBookByGuid(guid: UUID) {
    this.store.dispatch(SELECT_BOOK_BY_GUID({ payload: { guid } }))
  }

  public selectMultipleBooksById(bookIds: number[]) {
    this.store.dispatch(SELECT_MUTLTIPLE_BOOKS_BY_ID({ payload: { bookIds } }))
  }

  public selectMultipleBooksByGuid(guids: UUID[]) {
    this.store.dispatch(SELECT_MULTIPLE_BOOKS_BY_GUID({ payload: { guids } }))
  }

  public searchBookByTitle(query: Query) {
    this.store.dispatch(START_FILTERING_BOOKS({ payload: { query } }))
  }

  public clearSearchResults() {
    this.store.dispatch(CLEAR_FILTERED_BOOKS());
  }

  public removeBook(book: Book) {
    this.store.dispatch(REMOVE_BOOK({ payload: { book } }));
  }
}
