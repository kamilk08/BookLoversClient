import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { RatingsOverviewApi } from "src/app/modules/api/ratings/overviews/ratings-overview.api";
import { UPDATE_GROUPED_RATINGS } from "src/app/modules/classification/ratings/store/grouped-ratings/grouped-ratings.actions";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ratingsOverviewReducer } from "../..";
import { FETCH_OVERVIEW } from "../../ratings-overview.actions";
import { RatingsOverviewFacade } from "../../ratings-overview.facade";

import * as fromActions from '../edit-rating.actions';
import { EditRatingEffects } from "../edit-rating.effects";

describe('EDIT_RATING_EFFECTS', () => {

  let facade: RatingsOverviewFacade;
  let api: RatingsOverviewApi;
  let effects: EditRatingEffects;
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
        EffectsModule.forFeature([EditRatingEffects])
      ],
      providers: [
        EditRatingEffects,
        RatingsOverviewFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        provideMockActions(() => actions$),
        ErrorsFacade
      ]
    });

    facade = TestBed.get(RatingsOverviewFacade);
    api = TestBed.get(RatingsOverviewApi);
    effects = TestBed.get(EditRatingEffects);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

  });

  describe('CHANGE_RATING', () => {
    it('should dispatch two actions which are EDIT_RATING_SUCCESS and UPDATE_GROUPED_RATINGS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const oldRating = new Rating(bookId, userId, 2);
        oldRating.id = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;
        overview.addRating(oldRating);

        spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

        const newRating = new Rating(bookId, userId, 4);
        newRating.id = 2;

        const action = fromActions.EDIT_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, newRating: newRating } });

        spyOn(api, 'editRating').and.returnValue(of({}));

        actions$ = hot('a', { a: action });

        const secondAction = fromActions.EDIT_RATING_SUCCESS({ payload: { overview, userId: newRating.userId, newRating, oldRating } })
        const firstAction = UPDATE_GROUPED_RATINGS({
          payload: {
            bookId: overview.book.bookId,
            oldRating: oldRating.stars, newRating: newRating.stars
          }
        });

        expectObservable(effects.changeRating$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });
    });

    it('should dispatch EDIT_RATING_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const oldRating = new Rating(bookId, userId, 2);
        oldRating.id = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;
        overview.addRating(oldRating);

        spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

        const newRating = new Rating(bookId, userId, 4);
        newRating.id = 2;

        const action = fromActions.EDIT_RATING({ payload: { book: { id: bookId, guid: UUID.UUID() }, newRating: newRating } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'editRating').and.returnValue(response);

        const completion = fromActions.EDIT_RATING_FALIURE({ payload: { model: error } });

        expectObservable(effects.changeRating$).toBe('--b', { b: completion });
      })
    });
  });

  describe('CHANGE_RATING_SUCCESS', () => {
    it('should dispatch FETCH_OVERVIEW action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const bookId = 1;
        const userId = 1;

        const oldRating = new Rating(bookId, userId, 2);
        oldRating.id = 1;

        let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
        overview.id = 1;
        overview.addRating(oldRating);

        const newRating = new Rating(bookId, userId, 4);
        newRating.id = 2;

        const action = fromActions.EDIT_RATING_SUCCESS({ payload: { overview, userId: newRating.userId, newRating, oldRating } })

        actions$ = hot('a', { a: action });

        const completion = FETCH_OVERVIEW({ payload: { overview } });

        expectObservable(effects.changeRatingSuccess$)
          .toBe('b', { b: completion });

      })

    });
  })

});
