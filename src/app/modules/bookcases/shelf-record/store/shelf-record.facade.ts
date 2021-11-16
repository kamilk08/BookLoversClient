import { Injectable } from '@angular/core';
import * as fromStore from '../store/index';
import * as fromSelectors from './shelf-records.selectors';
import { Store } from '@ngrx/store';
import { SELECT_SHELF_RECORD, SELECT_MULTIPLE_SHELF_RECORDS } from './shelf-record.actions';

@Injectable()
export class ShelfRecordFacade {

  public readonly shelfRecord$ = (shelfId: number, bookId: number) => this.store.select(fromSelectors.shelfRecord(shelfId, bookId));
  public readonly multipleShelfRecords$ = (shelfId: number) => this.store.select(fromSelectors.multipleShelfRecords(shelfId));
  public readonly recordsFromShelves$ = (shelfIds: number[]) => this.store.select(fromSelectors.shelfRecordsFrom(shelfIds));

  constructor(private store: Store<fromStore.ShelfRecordState>) {

  }

  selectShelfRecord(shelfId: number, bookId: number) {
    this.store.dispatch(SELECT_SHELF_RECORD({ payload: { shelfId, bookId } }));
  }

  selectMutlipleShelfRecords(bookIds: number[], bookcaseId: number) {
    this.store.dispatch(SELECT_MULTIPLE_SHELF_RECORDS({ payload: { bookIds, bookcaseId: bookcaseId } }));
  }
}
