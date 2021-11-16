import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from '../../store/index';
import * as fromSelectors from '../store/module.selectors';
import { Query } from '../../../shared/common/query';
import { SELECT_SHELVES_WITH_BOOK } from './shelves-with-book.actions';
import { SELECT_BOOKCASES_WITH_BOOK } from './bookcases-with-book.actions';

@Injectable()
export class BookcaseStatisticsFacade {

  public readonly bookOnShelves$ = this.store.select(fromSelectors.shelvesWithBook);

  public readonly bookcasesWithBook$ = (bookId: number) => this.store.select(fromSelectors.bookcasesWithBook(bookId));
  public readonly bookInBookcases$ = (bookId: number) => this.store.select(fromSelectors.bookInBookcases(bookId));

  public readonly isProcessingBookOnShelves$ = this.store.select(fromSelectors.isProcessingShelvesWithBook);

  constructor(private store: Store<fromModule.BookcaseModuleState>) { }

  selectShelvesWithBook(bookId: number, query: Query) {
    this.store.dispatch(SELECT_SHELVES_WITH_BOOK({ payload: { bookId, query } }));
  }

  selectBookcasesWithBook(bookId: number) {
    this.store.dispatch(SELECT_BOOKCASES_WITH_BOOK({ payload: { bookId } }));
  }
}
