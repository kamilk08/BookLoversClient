import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { StatisticsApi } from "src/app/modules/api/ratings/statistics/statistics.api";

import * as fromActions from '../authors/author-statistics.actions';
import { Statistics } from "src/app/modules/api/ratings/statistics/models/statistics";
import { AuthorStatisticsEffects } from "../authors/author-statistics.effects";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('AUTHOR_STATISTICS_EFFECTS', () => {

  let effects: AuthorStatisticsEffects;
  let api: StatisticsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [AuthorStatisticsEffects,
        provideMockActions(() => actions$),
        ApiErrorAdapter
      ]
    });

    api = TestBed.get(StatisticsApi);
    effects = TestBed.get(AuthorStatisticsEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('SELECT_AUTHOR_STATISTICS$', () => {

    it('should assign FETCH_AUTHOR_STATISTICS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const authorId = 1;

        const action = fromActions.SELECT_AUTHOR_STATISTICS({ payload: { authorId } });

        let statistics: Statistics = {
          objectId: authorId,
          ratingsCount: 10,
          average: 5.00
        };

        spyOn(api, 'getAuthorStatistics').and.returnValue(of(statistics));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_AUTHOR_STATISTICS({ payload: { statistics } });

        expectObservable(effects.selectAuthorStatistics$)
          .toBe('b', { b: completion });

      });

    });

    it('should assign FETCH_AUTHOR_STATISTICS_FALIURE action when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const authorId = 1;

        const action = fromActions.SELECT_AUTHOR_STATISTICS({ payload: { authorId } })

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getAuthorStatistics').and.returnValue(response as any);

        const completion = fromActions.FETCH_AUTHOR_STATISTICS_FALIURE({ payload: { error } });

        expectObservable(effects.selectAuthorStatistics$)
          .toBe('--b', { b: completion });
      });
    });
  });

});
