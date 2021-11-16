import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';
import * as fromModule from './add-book-to-shelf.reducer';
import * as fromActions from './add-book-to-shelf.actions';
import * as fromSelectors from './add-book-to-shelf.selectors';

@Injectable()
export class AddBookToShelfFacade {

  public readonly shelf$ = this.store.select(fromSelectors.shelf);
  public readonly book$ = this.store.select(fromSelectors.book);
  public readonly processing$ = this.store.select(fromSelectors.processing);

  constructor(private store: Store<fromModule.AddBookToShelfState>) {
  }

  addToBookcase(bookcase: Bookcase, shelf: Shelf, book: Book) {
    this.store.dispatch(fromActions.ADD_BOOK_TO_SHELF({
      payload: { bookcase, shelf, book }
    }));
  }

}
