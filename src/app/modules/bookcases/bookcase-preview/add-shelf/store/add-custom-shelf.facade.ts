import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bookcase, Shelf } from '../../../models';
import { ADD_CUSTOM_SHELF } from './add-custom-shelf.actions';
import * as fromModle from './add-custom-shelf.reducer';
import * as fromSelectors from './add-custom-shelf.selectors';

@Injectable()
export class AddShelfFacade {

  public readonly addedShelf$ = this.store.select(fromSelectors.addedShelf);
  public readonly processing$ = this.store.select(fromSelectors.isProcessing);

  constructor(private readonly store: Store<fromModle.AddShelfState>) { }

  addCustomShlef(bookcase: Bookcase, shelfName: string) {
    const shelf = Shelf.customShelf(shelfName);

    this.store.dispatch(ADD_CUSTOM_SHELF({ payload: { bookcase, shelf } }));
  }
}
