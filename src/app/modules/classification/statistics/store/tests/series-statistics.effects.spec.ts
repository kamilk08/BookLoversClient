import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { StatisticsApi } from "src/app/modules/api/ratings/statistics/statistics.api";

import * as fromActions from '../series/series-statistics.actions';
import { Statistics } from "src/app/modules/api/ratings/statistics/models/statistics";
import { SeriesStatisticsEffects } from "../series/series-statistics.effects";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('SERIES_STATISTICS_EFFECTS', () => {

  let effects: SeriesStatisticsEffects;
  let api: StatisticsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        SeriesStatisticsEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SeriesStatisticsEffects);
    api = TestBed.get(StatisticsApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  });

  describe('SELECT_SERIES_STATISTICS$', () => {
    it('should assign FETCH_SERIES_STATISTICS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_SERIES_STATISTICS({ payload: { id } });

        const statistics: Statistics = {
          objectId: id,
          ratingsCount: 10,
          average: 5.00
        };

        spyOn(api, 'getSeriesStatistics').and.returnValue(of(statistics));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_SERIES_STATISTICS({ payload: { statistics } });

        expectObservable(effects.selectSeriesStatistics$)
          .toBe('b', { b: completion });

      })
    });

    it('should assign FETCH_SERIES_STATISTICS_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_SERIES_STATISTICS({ payload: { id } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getSeriesStatistics').and.returnValue(response as any);

        const completion = fromActions.FETCH_SERIES_STATISTICS_FALIURE({ payload: { error } });

        expectObservable(effects.selectSeriesStatistics$)
          .toBe('--b', { b: completion });
      })
    });
  });

  describe('SELECT_MULTIPLE_SERIES_STATISTICS$', () => {

    it('should assign FETCH_MULTIPLE_SERIES_STATISTICS when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_MULTIPLE_SERIES_STATISTICS({ payload: { ids: [id] } });

        const statistics: Statistics = {
          objectId: id,
          ratingsCount: 10,
          average: 5.00
        };

        const items = [statistics];

        spyOn(api, 'getMultipleSeriesStatistics').and.returnValue(of(items));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_MULTIPLE_SERIES_STATISTICS({ payload: { statistics: [statistics] } });

        expectObservable(effects.selectMultipleSeriesStatistics$)
          .toBe('b', { b: completion });

      })

    });

    it('should assign FETCH_SERIES_STATISTICS_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const ids = [1]

        const action = fromActions.SELECT_MULTIPLE_SERIES_STATISTICS({ payload: { ids } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getMultipleSeriesStatistics').and.returnValue(response as any);

        const completion = fromActions.FETCH_SERIES_STATISTICS_FALIURE({ payload: { error } });

        expectObservable(effects.selectMultipleSeriesStatistics$)
          .toBe('--b', { b: completion });
      })

    });

  })

});
