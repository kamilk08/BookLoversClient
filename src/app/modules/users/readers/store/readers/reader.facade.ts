import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_READER, SELECT_READER_BY_GUID } from './reader.actions';
import { UUID } from 'angular2-uuid';
import { Query } from 'src/app/modules/shared/common/query';
import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';
import { SEARCH_READERS } from '../search-readers/search-reader.actions';


@Injectable()
export class ReadersFacade {

  public readonly reader$ = (readerId: number) => this.store.select(fromSelectors.reader(readerId));
  public readonly readerByGuid$ = (guid: UUID) => this.store.select(fromSelectors.readerByGuid(guid));
  public readonly multipleReaders$ = (ids: number[]) => this.store.select(fromSelectors.multipleReaders(ids));

  public readonly userName$ = (readerId: number) => this.store.select(fromSelectors.readerUserName(readerId))
  public readonly role$ = (readerId: number) => this.store.select(fromSelectors.role(readerId));
  public readonly joinedAt$ = (readerId: number) => this.store.select(fromSelectors.joinedAt(readerId));

  public readonly searchReadersPage$ = this.store.select(fromSelectors.searchReaderPage);
  public readonly processingSearchReadersPage$ = this.store.select(fromSelectors.processing);

  constructor(private store: Store<fromModule.ReadersModuleState>) { }

  public selectReader(readerId: number) {
    this.store.dispatch(SELECT_READER({ payload: { readerId } }));
  }

  public selectReaderByGuid(guid: UUID) {
    this.store.dispatch(SELECT_READER_BY_GUID({ payload: { guid } }));
  }

  public searchReaders(query: Query) {
    this.store.dispatch(SEARCH_READERS({ payload: { query } }));
  }

}
