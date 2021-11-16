import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { QuotesApi } from "src/app/modules/api/quotes/quotes.api";
import { QuotesPaginationEffects } from "../quotes-pagination.effects";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_MULTIPLE_QUOTES } from "../../quotes/quote.actions";
import { QUOTES_PAGE_QUERY } from "../../../models/quotes-page.query";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { QuotesPagination } from "../quotes-pagination.reducer";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";

import * as fromActions from '../quotes-pagination.actions';


describe('QUOTES_PAGINATION', () => {

  let effects: QuotesPaginationEffects;
  let api: QuotesApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule

      ],
      providers: [
        ApiErrorAdapter,
        QuotesPaginationEffects,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockActions(() => actions$),
        provideMockStore<QuotesPagination>()
      ]
    });

    effects = TestBed.get(QuotesPaginationEffects);
    api = TestBed.get(QuotesApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e)
    });
  });

  describe('SELECT_AUTHOR_QUOTES_PAGE$', () => {
    it('should assign two actions when api call was successfull SET_AUTHOR_QUOTES_PAGE and FETCH_MULTIPLE_QUOTES', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_AUTHOR_QUOTES_PAGE({ payload: { authorId: 1, query: QUOTES_PAGE_QUERY() } });

        const pageResult: PageResult = {
          items: [],
          totalItems: 0,
          page: 0,
          pagesCount: 0
        }

        spyOn(api, 'getAuthorQuotes')
          .and.returnValue(of({ pageResult }));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_AUTHOR_QUOTES_PAGE({ payload: { quotes: [], pageResult } });
        const secondAction = FETCH_MULTIPLE_QUOTES({ payload: { quotes: [] } });

        expectObservable(effects.selectAuthorQuotesPage$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });

    });

  });

  describe('SELECT_BOOK_QUOTES_PAGE$', () => {
    it('should assign two actions SET_BOOK_QUOTES_PAGE and FETCH_MULTIPLE_QUOTES', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOK_QUOTES_PAGE({ payload: { bookId: 1, query: QUOTES_PAGE_QUERY() } });

        const pageResult: PageResult = {
          items: [],
          totalItems: 0,
          page: 0,
          pagesCount: 0
        }

        spyOn(api, 'getBookQuotes')
          .and.returnValue(of({ pageResult }));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_BOOK_QUOTES_PAGE({ payload: { quotes: [], pageResult } });
        const secondAction = FETCH_MULTIPLE_QUOTES({ payload: { quotes: [] } });

        expectObservable(effects.selectBookQuotesPage$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      });

    });
  });

  describe('SELECT_READER_QUOTES_PAGE', () => {
    it('should assign two actions when api call was successfull SET_READER_QUOTES_PAGE and FETCH_MULTIPLE_QUOTES', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_READER_QUOTES_PAGE({ payload: { readerId: 1, query: QUOTES_PAGE_QUERY() } });

        const pageResult: PageResult = {
          items: [],
          totalItems: 0,
          page: 0,
          pagesCount: 0
        }

        spyOn(api, 'getReaderQuotes')
          .and.returnValue(of({ pageResult }))

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_READER_QUOTES_PAGE({ payload: { quotes: [], pageResult } });
        const secondAction = FETCH_MULTIPLE_QUOTES({ payload: { quotes: [] } });

        expectObservable(effects.selectReaderQuotes$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          })

      });

    });
  });

});
