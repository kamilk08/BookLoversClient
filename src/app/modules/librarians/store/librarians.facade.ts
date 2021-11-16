import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

import { SELECT_LIBRARIAN_BY_ID, SELECT_LIBRARIAN_BY_READER_GUID } from './librarian.actions';
import { SELECT_LIBRARIANS_PAGE } from './pagination/librarians-pagination.actions';

import * as fromIndex from './index';
import * as fromSelectors from '../module.selectors';

@Injectable()
export class LibrariansFacade {

  public readonly librarianById$ = (id: number) => this.store.select(fromSelectors.getLibrarianById(id));
  public readonly librarianByReaderGuid$ = (guid: UUID) => this.store.select(fromSelectors.getLibrarianByReaderGuid(guid));

  public readonly librariansPage$ = this.store.select(fromSelectors.pageResult);

  constructor(private store: Store<fromIndex.LibrariansModuleState>) { }

  selectLibrarianById(id: number) {
    this.store.dispatch(SELECT_LIBRARIAN_BY_ID({ payload: { id } }))
  }

  selectLibrarianByReaderGuid(guid: UUID) {
    this.store.dispatch(SELECT_LIBRARIAN_BY_READER_GUID({ payload: { guid } }));
  }

  selectLibrariansPage(ids: number[], page: number, count: number) {
    this.store.dispatch(SELECT_LIBRARIANS_PAGE({ payload: { ids, page, count } }));
  }

}
