import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { RatingsOverviewApi } from "src/app/modules/api/ratings/overviews/ratings-overview.api";
import { RatingOverviewEffects } from "../ratings-overview.effects";

import * as fromActions from '../ratings-overview.actions';
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { UUID } from "angular2-uuid";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ApiError } from "src/app/modules/api/api-error.model";

describe('RATINGS_OVERVIEW_EFFECTS', () => {

  let effects: RatingOverviewEffects;
  let api: RatingsOverviewApi;
  let actions$: Actions = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        RatingOverviewEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$),
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    effects = TestBed.get(RatingOverviewEffects);
    api = TestBed.get(RatingsOverviewApi);
  });

  describe('SELECT_RATINGS_OVERVIEW', () => {
    it('should dispatch FETCH_OVERVIEW action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const overview: RatingsOverview =
          new RatingsOverview({ bookId: 1, bookGuid: UUID.UUID() });
        overview.id = 1;

        spyOn(api, 'getOverview').and.returnValue(of(overview));

        const action = fromActions.SELECT_RATINGS_OVEREVIEW({ payload: { bookId: 1 } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_OVERVIEW({ payload: { overview } });

        expectObservable(effects.selectRatingsOverview$)
          .toBe('b', { b: completion });
      })

    });

    it('should dispatch FETCH_OVERVIEW_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_RATINGS_OVEREVIEW({ payload: { bookId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getOverview').and.returnValue(response as any);

        const completion = fromActions.FETCH_OVERVIEW_FALIURE({ payload: { error } });

        expectObservable(effects.selectRatingsOverview$)
          .toBe('-b', { b: completion });
      });
    });
  });

  describe('SELECT_MULTIPLE_OVERVIEWS', () => {
    it('should dispatch FETCH_MULTIPLE_OVERVIEWS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const overview: RatingsOverview =
          new RatingsOverview({ bookId: 1, bookGuid: UUID.UUID() });
        overview.id = 1;

        const action = fromActions.SELECT_MULTIPLE_OVERVIEWS({ payload: { bookIds: [] } });

        spyOn(api, 'getMultipleOverviews').and.returnValue(of([overview]));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_MULTIPLE_OVERVIEWS({ payload: { overviews: [overview] } });

        expectObservable(effects.selectMultipleOverviews$)
          .toBe('b', { b: completion });
      });

    });

    it('should dispatch FETCH_OVERVIEW_FALIURE action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_MULTIPLE_OVERVIEWS({ payload: { bookIds: [1] } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getMultipleOverviews').and.returnValue(response as any);

        const completion = fromActions.FETCH_OVERVIEW_FALIURE({ payload: { error } });

        expectObservable(effects.selectMultipleOverviews$)
          .toBe('-b', { b: completion });

      });

    });

  });

});
