import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { BookAdapter } from "src/app/modules/api/books/book.adapter";
import { BookApi } from "src/app/modules/api/books/book.api";
import { SearchBookEffects } from "../search-book.effects";

import * as fromActions from '../search-book.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe("SEARCH_BOOK_EFFECTS", () => {

  let effects: SearchBookEffects;
  let api: BookApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BookApi, BookAdapter,
        SearchBookEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(SearchBookEffects);
    api = TestBed.get(BookApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('startFilteringBooks$', () => {
    it('should dispatch FETCH_FILTERED_BOOKS actiion when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(api, 'searchBookByTitle').and.returnValue(of([]));

        const action = fromActions.START_FILTERING_BOOKS({ payload: { query: DEFAULT_QUERY() } });
        const completion = fromActions.FETCH_FILTERED_BOOKS({ payload: { books: [] } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.startFilteringBooks$)
          .toBe('b', { b: completion })
      })

    });

    it('should dispatch FILTER_BOOKS_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.START_FILTERING_BOOKS({ payload: { query: DEFAULT_QUERY() } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'searchBookByTitle').and.returnValue(response as any);

        const completion = fromActions.FILTER_BOOK_FALIURE({ payload: { error } });

        expectObservable(effects.startFilteringBooks$)
          .toBe('--b', { b: completion });
      })
    })
  })

})
