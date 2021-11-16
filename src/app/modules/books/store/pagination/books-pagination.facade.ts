import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromBooks from '../index';
import * as fromSelectors from '../module.selectors';
import { SELECT_BOOKS_PAGE } from './books-pagination.actions';
import { Query } from 'src/app/modules/shared/common/query';
import { delay } from 'rxjs/operators';

@Injectable()
export class BooksPaginationFacade {

  public readonly booksPage$ = this.store.select(fromSelectors.paginatedBookIds);
  public readonly pageResult$ = this.store.select(fromSelectors.pageResult);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);
  public readonly totalItems$ = this.store.select(fromSelectors.totalItems);

  public readonly isProcessing$ = this.store.select(fromSelectors.nextPageProcessing).pipe(delay(1000));

  constructor(private store: Store<fromBooks.BooksModuleState>) { }

  public selectBooksPage(query: Query) {
    this.store.dispatch(SELECT_BOOKS_PAGE({ payload: { query } }));
  }
}
