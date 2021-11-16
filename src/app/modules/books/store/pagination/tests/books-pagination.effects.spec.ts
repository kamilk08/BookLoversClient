import { TestBed } from "@angular/core/testing"
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing"
import { BooksPaginationEffects } from "../books-pagination.effects";

import * as fromActions from '../books-pagination.actions';
import { PageResult } from "src/app/modules/shared/common/page-result";
import { BookFacade } from "../../book.facade";
import { HttpClientModule } from "@angular/common/http";
import { BookApi } from "src/app/modules/api/books/book.api";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { BooksPagination } from "../books-pagination.reducer";

describe('BOOKS_PAGINATION_EFFECTS', () => {
  let scheduler: TestScheduler;
  let actions$: Observable<Action>
  let effects: BooksPaginationEffects;
  let bookApi: BookApi

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<BooksPagination>(),
        BooksPaginationEffects,
        BookFacade,
        BookApi,
        BookAdapter,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade

      ],
      imports: [HttpClientModule]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    effects = TestBed.get(BooksPaginationEffects);
    bookApi = TestBed.get(BookApi);
  })

  describe('setBooksPage$', () => {
    it('should dispatch SET_BOOKCASE_PAGE_SUCCESS action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        let pageResult: PageResult = {
          page: 0,
          pagesCount: 0,
          items: [],
          totalItems: 0
        }

        const action = fromActions.SET_BOOKS_PAGE({ payload: { pageResult: pageResult } })

        actions$ = hot('a', { a: action });

        const completion = fromActions.SET_BOOKS_PAGE_SUCCESS();

        expectObservable(effects.setBooksPage$)
          .toBe('1.5s b', { b: completion });
      })

    });
  });

  describe('selectBooksPage$', () => {
    it('should dispatch SET_BOOKS_PAGE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const pageResult: PageResult = {
          page: 0,
          pagesCount: 0,
          items: [],
          totalItems: 10
        };
        const items = [];
        const apiResponse = {
          pageResult: pageResult,
          books: items
        }

        spyOn(bookApi, 'selectBooksPage')
          .and.returnValue(of(apiResponse))

        let query = DEFAULT_QUERY();

        const action = fromActions.SELECT_BOOKS_PAGE({ payload: { query } })

        const completion = fromActions.SET_BOOKS_PAGE({ payload: { pageResult } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.selectBooksPage$)
          .toBe('b', { b: completion });
      })

    })
  })

})
