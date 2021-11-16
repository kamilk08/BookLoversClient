import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReaderStatisticsApi } from "src/app/modules/api/statistics/statistics.api";
import { ReaderRatingsStatisticsEffects } from "../ratings-statistics.effects";

import * as fromActions from '../ratings-statistics.actions';
import { ReaderRatings } from "src/app/modules/api/statistics/models/reader-ratings-statistics.model";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('READER_RATINGS_STATISTICS_EFFECTS', () => {

  let effects: ReaderRatingsStatisticsEffects;
  let api: ReaderStatisticsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ApiErrorAdapter,
        ReaderRatingsStatisticsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ReaderRatingsStatisticsEffects);
    api = TestBed.get(ReaderStatisticsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_READER_RATINGS$', () => {
    it('should assign FETCH_READER_RATINGS_STATISTICS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_READER_RATINGS_STATISTICS({ payload: { readerId } });

        const ratings: ReaderRatings = new ReaderRatings();
        ratings.readerId = 1;
        ratings.ratingsCount = 1;
        ratings.groupedRatings = { 1: 1 };

        spyOn(api, 'getReaderRatingsStatistics')
          .and.returnValue(of(ratings))

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_READER_RATINGS_STATISTICS({ payload: { statistics: ratings } });

        expectObservable(effects.selectReaderRatings$)
          .toBe('b', { b: completion });
      });

    });
    it('should assign FETCH_READER_RATINGS_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_READER_RATINGS_STATISTICS({ payload: { readerId } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getReaderRatingsStatistics').and.returnValue(response as any);

        const completion = fromActions.FETCH_READER_RATINGS_STATISTICS_FALIURE({ payload: { error } });

        expectObservable(effects.selectReaderRatings$)
          .toBe('-b', { b: completion });
      })

    });

  });

});
