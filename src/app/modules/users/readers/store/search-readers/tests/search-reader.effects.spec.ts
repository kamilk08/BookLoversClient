import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReadersApi } from "src/app/modules/api/readers/readers.api";
import { SearchReaderEffects } from "../search-reader.effects";

import * as fromActions from '../search-reader.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_MULTIPLE_READERS } from "../../readers/reader.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('SEARCH_READER_EFFECTS', () => {

  let effects: SearchReaderEffects;
  let api: ReadersApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  let reader = new Reader(new ReaderDetails('userName', 'role', new Date()), 1);
  reader.identification.id = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule

      ],
      providers: [
        SearchReaderEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SearchReaderEffects);
    api = TestBed.get(ReadersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SEARCH_READER$', () => {

    it('should assign SET_READERS_PAGE and FETCH_MULTIPLE_READERS actions when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SEARCH_READERS({ payload: { query: DEFAULT_QUERY() } });

        const items = [reader];

        const pageResult: PageResult = {
          items,
          totalItems: 1,
          page: 0,
          pagesCount: 1
        }

        spyOn(api, 'searchReaders').and.returnValue(of({ readers: items, pageResult }));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.SET_READERS_PAGE({ payload: { pageResult } });
        const secondAction = FETCH_MULTIPLE_READERS({ payload: { readers: items } });

        expectObservable(effects.searchReader$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      });

    });

    it('should assign SEARCH_READERS_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SEARCH_READERS({ payload: { query: DEFAULT_QUERY() } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'searchReaders').and.returnValue(response as any);

        const completion = fromActions.SEARCH_READERS_FALIURE({ payload: { error } });

        expectObservable(effects.searchReader$)
          .toBe('-b', { b: completion });
      });

    });

  });


});
