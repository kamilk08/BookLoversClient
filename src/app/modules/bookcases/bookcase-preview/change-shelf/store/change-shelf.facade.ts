import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from './change-shelf.reducer';
import * as fromActions from './change-shelf.actions';
import * as fromSelectors from './change-shelf.selectors';
import { Bookcase, Shelf } from '../../../models';
import { Book } from 'src/app/modules/api/books/models';

@Injectable()
export class ChangeShelfFacade {

  public readonly oldShelf$ = this.store.select(fromSelectors.oldShelf);
  public readonly newShelf$ = this.store.select(fromSelectors.newShelf);
  public readonly book$ = this.store.select(fromSelectors.book);

  constructor(private readonly store: Store<fromModule.ChangeShelfState>) {

  }

  changeShelf(bookcase: Bookcase, shelves: { oldShelf: Shelf, newShelf: Shelf }, book: Book) {
    this.store.dispatch(fromActions.CHANGE_SHELF({
      payload: {
        bookcase: bookcase, shelves:
          { oldShelf: shelves.oldShelf, newShelf: shelves.newShelf }, book
      }
    }));
  }
}
