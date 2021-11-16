import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { SearchSeriesEffects } from "../search-series.effects";

import * as fromActions from '../search-series.actions';
import { DEFAULT_QUERY, SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('SEARCH_SERIES_EFFECTS', () => {

  let effects: SearchSeriesEffects;
  let api: SeriesApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        SearchSeriesEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    effects = TestBed.get(SearchSeriesEffects);
    api = TestBed.get(SeriesApi);

  });

  describe('START_FILTERINB_BOOK_SERIES$', () => {
    it('should assign FETCH_FILTERED_SERIES when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(api, 'findSeries').and.returnValue(of([]))

        const action = fromActions.START_FILTERING_SERIES({ payload: { query: SEARCH_QUERY('value') } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_FILTERED_SERIES({ payload: { series: [] } });

        expectObservable(effects.startFilteringBookSeries$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign FILTER_SERIES_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.START_FILTERING_SERIES({ payload: { query: SEARCH_QUERY('value') } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'findSeries').and.returnValue(response as any);

        const completion = fromActions.FILTER_SERIES_FALIURE({ payload: { error } });

        expectObservable(effects.startFilteringBookSeries$)
          .toBe('--b', { b: completion });

      });

    });


  });


});
