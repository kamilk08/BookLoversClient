import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookcase, Shelf } from '../../../models';
import { EDIT_CUSTOM_SHELF_NAME } from './edit-shelf.actions';

import * as fromModule from './edit-shelf.reducer';
import * as fromSelectors from './edit-shelf.selectors';

@Injectable()
export class EditShelfFacade {

  public readonly editedShelf$ = this.store.select(fromSelectors.shelf);
  public readonly shelfName$ = this.store.select(fromSelectors.shelfName);

  constructor(private store: Store<fromModule.EditShelfState>) {

  }

  editShelfName(bookcase: Bookcase, shelf: Shelf, shelfName: string) {
    this.store.dispatch(EDIT_CUSTOM_SHELF_NAME({ payload: { bookcase: bookcase, shelf: shelf, shelfName } }))
  }
}
