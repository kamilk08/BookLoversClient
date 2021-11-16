import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { RatingsOverviewApi } from "src/app/modules/api/ratings/overviews/ratings-overview.api";
import { ratingsOverviewReducer } from "../..";
import { RatingsOverviewFacade } from "../../ratings-overview.facade";
import { RemoveRatingEffects } from "../remove-rating.effects";

import * as fromActions from '../remove-rating.actions';
import { UUID } from "angular2-uuid";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { UPDATE_GROUPED_RATINGS } from "src/app/modules/classification/ratings/store/grouped-ratings/grouped-ratings.actions";
import { FETCH_OVERVIEW } from "../../ratings-overview.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('REMOVE_RATING_EFFECTS', () => {

  let facade: RatingsOverviewFacade;
  let api: RatingsOverviewApi;
  let effects: RemoveRatingEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings-overview', ratingsOverviewReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RemoveRatingEffects])
      ],
      providers: [
        RemoveRatingEffects,
        RatingsOverviewFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        provideMockActions(() => actions$),
        ErrorsFacade
      ]
    });

    effects = TestBed.get(RemoveRatingEffects);
    facade = TestBed.get(RatingsOverviewFacade);
    api = TestBed.get(RatingsOverviewApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('REMOVE_RATING', () => {
    it('should dispatch two actions which are UPDATE_GROUPED_RATINGS and REMOVE_RATING_SUCCESS', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const rating = new Rating(bookId, userId, 2);
        rating.id = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;
        overview.addRating(rating);

        spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

        const action = fromActions.REMOVE_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, userId } })

        spyOn(api, 'removeRating').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const firstAction = UPDATE_GROUPED_RATINGS({
          payload: {
            bookId: action.payload.book.id, oldRating: rating.stars,
            newRating: undefined
          }
        });

        const secondAction = fromActions.REMOVE_RATING_SUCCESS({
          payload: {
            overview, userId: action.payload.userId,
            removedRating: rating
          }
        });

        expectObservable(effects.removeRating$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });
    });

    it('should dispatch REMOVE_RATING_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const rating = new Rating(bookId, userId, 2);
        rating.id = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;
        overview.addRating(rating);

        spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

        const action = fromActions.REMOVE_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, userId } })

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeRating').and.returnValue(response);

        const completion = fromActions.REMOVE_RATING_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeRating$)
          .toBe('--b', { b: completion });
      });
    });
  });

  describe('REMOVE_RATING_SUCCESS', () => {
    it('should dispatch FETCH_OVERVIEW action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const rating = new Rating(bookId, userId, 2);
        rating.id = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;
        overview.addRating(rating);

        const action = fromActions.REMOVE_RATING_SUCCESS({
          payload: { overview, removedRating: rating, userId }
        });

        actions$ = hot('a', { a: action });

        const completion = FETCH_OVERVIEW({ payload: { overview } });

        expectObservable(effects.removeRatingSuccess$)
          .toBe('b', { b: completion });

      });

    })

  })

});
