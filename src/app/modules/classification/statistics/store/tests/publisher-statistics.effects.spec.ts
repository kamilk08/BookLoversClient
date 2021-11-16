import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Statistics } from "src/app/modules/api/ratings/statistics/models/statistics";
import { StatisticsApi } from "src/app/modules/api/ratings/statistics/statistics.api";


import * as fromActions from '../publisher/publisher-statistics.actions';
import { PublisherStatisticsEffects } from "../publisher/publisher-statistics.effects";

describe('PUBLISHER_STATISTICS_EFFECTS', () => {

  let effects: PublisherStatisticsEffects;
  let api: StatisticsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        PublisherStatisticsEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PublisherStatisticsEffects);
    api = TestBed.get(StatisticsApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  });

  describe('SELECT_PUBLISHER_STATISTICS$', () => {
    it('should assign FETCH_PUBLISHER_STATISTICS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const publisherId = 1;

        const action = fromActions.SELECT_PUBLISHER_STATISTICS({ payload: { publisherId } })

        const statistics: Statistics = {
          objectId: publisherId,
          ratingsCount: 10,
          average: 5.00
        };

        spyOn(api, 'getPublisherStatistics').and.returnValue(of(statistics));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_PUBLISHER_STATISTICS({ payload: { statistics } });

        expectObservable(effects.selectPublisherStatistics$)
          .toBe('b', { b: completion });

      });

    });

    it('should assign FETCH_PUBLISHER_STATISTICS_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const publisherId = 1;

        const action = fromActions.SELECT_PUBLISHER_STATISTICS({ payload: { publisherId } })

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getPublisherStatistics')
          .and.returnValue(response as any);

        const completion = fromActions.FETCH_PUBLISHER_STATISTICS_FALIURE({ payload: { error } });

        expectObservable(effects.selectPublisherStatistics$)
          .toBe('--b', { b: completion });
      })

    });
  });

});
