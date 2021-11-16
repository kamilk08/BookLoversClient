import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookcase, Shelf } from '../../../models';
import * as fromActions from './remove-shelf.actions';
import * as fromModule from './remove-shelf.reducer';
import * as fromSelectors from './remove-shelf.selectors';

@Injectable()
export class RemoveShelfFacade {

  public readonly shelfToRemove$ = this.store.select(fromSelectors.shelfToRemove$);
  public readonly processing$ = this.store.select(fromSelectors.processing$);

  constructor(private store: Store<fromModule.RemoveShelfState>) { }

  removeShelf(bookcase: Bookcase, shelf: Shelf) {
    this.store.dispatch(fromActions.REMOVE_SHELF({ payload: { bookcase: bookcase, shelf: shelf } }));
  }
}
