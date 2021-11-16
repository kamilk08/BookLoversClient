import { Injectable } from '@angular/core';
import * as fromModule from './index';
import * as fromSelectors from './bookcase-pagination.selectors';
import * as fromActions from './bookcase-pagination.actions';
import { Store } from '@ngrx/store';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { BookcasePageQuery } from '../models/bookcase-page.query';

@Injectable()
export class BookcasePaginationFacade {

  public readonly bookcasePage$ = this.store.select(fromSelectors.bookcasePagination);
  public readonly pageResult$ = this.store.select(fromSelectors.pageResult);
  public readonly currentPage$ = this.store.select(fromSelectors.currentPage);
  public readonly totalItems$ = this.store.select(fromSelectors.totalItems);

  public readonly processing$ = this.store.select(fromSelectors.processing);

  public readonly bookcaseBookIds$ = this.store.select(fromSelectors.bookcaseBookIds);

  constructor(private store: Store<fromModule.BookcasePaginationModuleState>) { }

  selectBooksPage(bookcaseId: number, query: BookcasePageQuery) {
    this.store.dispatch(fromActions.SELECT_BOOKCASE_PAGE({ payload: { bookcaseId, query } }))
  }

  setBooksPage(pageResult: PageResult) {
    this.store.dispatch(fromActions.SET_BOOKCASE_PAGE({ payload: { pageResult } }));
  }

}
