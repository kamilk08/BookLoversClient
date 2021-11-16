import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { RatingsApi } from "src/app/modules/api/ratings/ratings.api";
import { ratingsStateReducer } from "..";
import { RatingsEffects } from "../ratings.effects";

import * as fromActions from '../ratings.actions';
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('RATINGS_EFFECTS', () => {

  let effects: RatingsEffects;
  let api: RatingsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings', ratingsStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RatingsEffects])
      ],
      providers: [
        RatingsEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$),
        ApiErrorAdapter
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    api = TestBed.get(RatingsApi);
    effects = TestBed.get(RatingsEffects);
  });

  describe('SELECT_USER_BOOK_RATING$', () => {
    it('should dispatch FETCH_RATING action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const bookId = 1;
        const userId = 1;

        const rating = new Rating(bookId, userId, 4);

        const action = fromActions.SELECT_RATING({ payload: { bookId, userId } });

        spyOn(api, 'getUserBookRating')
          .and.returnValue(of(rating));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_RATING({ payload: { rating } });

        expectObservable(effects.selectUserBookRating$)
          .toBe('b', { b: completion });
      });

    });

    it('should dispatch FETCH_RATING_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const action = fromActions.SELECT_RATING({ payload: { bookId, userId } });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getUserBookRating')
          .and.returnValue(response as any);

        actions$ = hot('-a', { a: action });

        const completion = fromActions.FETCH_FALIURE({ payload: { error } });

        expectObservable(effects.selectUserBookRating$)
          .toBe('--b', { b: completion });
      })

    });

  });

});
