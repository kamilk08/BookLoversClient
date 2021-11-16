import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';
import * as fromModule from './index';
import * as fromSelectors from './remove-bookcase-book.selectors';
import { REMOVE_BOOK_FROM_BOOKCASE } from './remove-book-from-bookcase.actions';
import { REMOVE_BOOK_FROM_SHELF } from './remove-book-from-shelf.actions';

@Injectable()
export class RemoveBookcaseBookFacade {

  public readonly bookRemovedFromShelf$ = this.store.select(fromSelectors.bookRemovedFromShelf);
  public readonly shelfThatContainedBook$ = this.store.select(fromSelectors.shelfThahContainsBook);

  public readonly removedBookFromBookcase$ = this.store.select(fromSelectors.removedBook);


  constructor(private readonly store: Store<fromModule.RemoveBookcaseBookState>) { }

  removeFromShelf(bookcase: Bookcase, shelf: Shelf, book: Book) {
    this.store.dispatch(REMOVE_BOOK_FROM_SHELF({ payload: { bookcase: bookcase, shelf: shelf, book: book } }));
  }

  removeFromBookcase(bookcase: Bookcase, book: Book) {
    this.store.dispatch(REMOVE_BOOK_FROM_BOOKCASE({ payload: { bookcase, book } }));
  }
}
