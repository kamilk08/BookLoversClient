import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../index';
import * as fromSelectors from './bookcase.selectors';

import { SELECT_BOOKCASE, SELECT_CURRENT_USER_BOOKCASE, SELECT_USER_BOOKCASE } from './bookcase.actions';


@Injectable()
export class BookcaseFacade {

  public readonly error$ = this.store.select(fromSelectors.error);

  public readonly bookcaseById$ = (bookcaseId: number) => this.store.select(fromSelectors.getBookcaseById(bookcaseId));
  public readonly bookcaseByUser$ = (userId: number) => this.store.select(fromSelectors.getBookcaseByUserId(userId));

  public readonly bookcaseShelvesCount$ = (userId: number) => this.store.select(fromSelectors.bookcaseShelvesCount(userId))
  public readonly bookOnShelves$ = (bookId: number, userId: number) => this.store.select(fromSelectors.bookOnShelves(bookId, userId));

  public readonly isProcessing$ = this.store.select(fromSelectors.isProcessing);

  constructor(private store: Store<fromStore.BookcaseModuleState>) { }

  selectBookcase(id: number) {
    this.store.dispatch(SELECT_BOOKCASE({ payload: { id } }));
  }

  selectUserBookcase(userId: number) {
    this.store.dispatch(SELECT_USER_BOOKCASE({ payload: { userId } }));
  }

  selectCurrentUserBookcase() {
    this.store.dispatch(SELECT_CURRENT_USER_BOOKCASE())
  }

}
