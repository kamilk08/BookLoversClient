import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { ApiModule } from "src/app/modules/api/api.module";
import { RatingsOverviewApi } from "src/app/modules/api/ratings/overviews/ratings-overview.api";
import { ratingsOverviewReducer } from "../..";
import { RatingOverviewEffects } from "../../ratings-overview.effects";
import { RatingsOverviewFacade } from "../../ratings-overview.facade";
import { AddRatingEffects } from "../add-rating.effects";

import * as fromActions from '../add-rating.actions';
import { UUID } from "angular2-uuid";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { Observable, of } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { TestScheduler } from "rxjs/testing";
import { UPDATE_GROUPED_RATINGS } from "src/app/modules/classification/ratings/store/grouped-ratings/grouped-ratings.actions";
import { FETCH_OVERVIEW } from "../../ratings-overview.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('ADD_RATING_EFFECTS', () => {

  let facade: RatingsOverviewFacade;
  let api: RatingsOverviewApi;
  let effects: AddRatingEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings-overview', ratingsOverviewReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddRatingEffects, RatingOverviewEffects])
      ],
      providers: [
        AddRatingEffects,
        ApiErrorAdapter,
        ErrorActions,
        RatingOverviewEffects,
        RatingsOverviewFacade,
        MesssagesFacade,
        provideMockActions(() => actions$),
        ErrorsFacade
      ]
    });

    facade = TestBed.get(RatingsOverviewFacade);
    api = TestBed.get(RatingsOverviewApi);
    effects = TestBed.get(AddRatingEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  })

  describe('ADD_RATING', () => {
    it('should dispatch two actions ADD_RATING_SUCCESS and UPDATE_GROUPED_RATINGS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;

        spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

        const rating = new Rating(bookId, userId, 4);
        rating.id = 1;

        const action = fromActions.ADD_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, bookcaseGuid: UUID.UUID(), rating } });

        spyOn(api, 'addRating').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.ADD_RATING_SUCCESS({ payload: { overview, rating } })
        const secondAction = UPDATE_GROUPED_RATINGS({ payload: { bookId: overview.book.bookId, oldRating: undefined, newRating: action.payload.rating.stars } });

        expectObservable(effects.addRating$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      })

    });

    it('should dispatch ADD_RATING_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;

        spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

        const rating = new Rating(bookId, userId, 4);
        rating.id = 1;

        const action = fromActions.ADD_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, bookcaseGuid: UUID.UUID(), rating } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addRating').and.returnValue(response);

        const completion = fromActions.ADD_RATING_FALIURE({ payload: { model: error } });

        expectObservable(effects.addRating$).toBe('--b', { b: completion });
      })

    });
  });

  describe('ADD_RATING_SUCCESS', () => {
    it('should dispatch FETCH_OVERVIEW action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;

        const rating = new Rating(bookId, userId, 4);
        rating.id = 1;

        const action = fromActions.ADD_RATING_SUCCESS({ payload: { overview, rating } });

        actions$ = hot('a', { a: action });

        const completion = FETCH_OVERVIEW({ payload: { overview } });

        expectObservable(effects.addRatingSuccess$)
          .toBe('b', { b: completion });
      })

    });
  });

});
