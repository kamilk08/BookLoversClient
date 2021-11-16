import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { RatingsApi } from "src/app/modules/api/ratings/ratings.api";
import { GroupedRatingsEffects } from "../grouped-ratings.effects";

import * as fromActions from '../grouped-ratings.actions';
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";

describe('GROUPED_RATINGS_EFFECTS', () => {
  let scheduler: TestScheduler;
  let api: RatingsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let effects: GroupedRatingsEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupedRatingsEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ],
      imports: [
        ApiModule,
        HttpClientModule
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    api = TestBed.get(RatingsApi);
    effects = TestBed.get(GroupedRatingsEffects);
  })

  describe('SELECT_GROUPED_RATINGS$', () => {
    it('should dispatch FETCH_GROUPED_RATINGS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;

        const groupedRatings = {
          1: 1,
          2: 2
        };

        const response = {
          bookId: bookId,
          ratings: groupedRatings
        };

        spyOn(api, 'getGroupedRatings').and.returnValue(of(response));

        const action = fromActions.SELECT_GROUPED_RATINGS({ payload: { bookId } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_GROUPED_RATINGS({ payload: { bookId, groupedRatings } });

        expectObservable(effects.selectGroupedRatings$)
          .toBe('b', { b: completion });
      });
    });

    it('should dispatch FETCH_GROUPED_RATINGS_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }
        const action = fromActions.SELECT_GROUPED_RATINGS({ payload: { bookId } });

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }))

        spyOn(api, 'getGroupedRatings').and.returnValue(response as any);

        const completion = fromActions.FETCH_GROUPED_RATINGS_FALIURE({ payload: { error } });

        expectObservable(effects.selectGroupedRatings$)
          .toBe('--b', { b: completion });
      })

    })
  })
});
