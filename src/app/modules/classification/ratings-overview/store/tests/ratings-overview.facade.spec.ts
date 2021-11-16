import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { RatingsOverviewApi } from "src/app/modules/api/ratings/overviews/ratings-overview.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ratingsOverviewReducer } from "..";
import { AddRatingEffects } from "../add-rating/add-rating.effects";
import { EditRatingEffects } from "../edit-rating/edit-rating.effects";
import { RatingOverviewEffects } from "../ratings-overview.effects";
import { RatingsOverviewFacade } from "../ratings-overview.facade";
import { RemoveRatingEffects } from "../remove-rating/remove-rating.effects";

describe('RATINGS_OVERVIEW_FACADE', () => {

  let facade: RatingsOverviewFacade;
  let api: RatingsOverviewApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings-overview', ratingsOverviewReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RatingOverviewEffects, AddRatingEffects, EditRatingEffects, RemoveRatingEffects])
      ],
      providers: [
        RatingsOverviewFacade,
        RatingOverviewEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(RatingsOverviewFacade);
    api = TestBed.get(RatingsOverviewApi);
  });


  describe('SELECT_OVERVIEW', () => [
    it('should make an api call as a result of which signleOverview$ observable should emit new value', async (done) => {

      const bookId = 1;
      const bookGuid = UUID.UUID();

      let overview = new RatingsOverview({ bookId, bookGuid })
      overview.id = 1;

      spyOn(api, 'getOverview').and.returnValue(of(overview));

      facade.selectRatingOverview(bookId);

      const subscription = facade.singleOverview$(bookId)
        .subscribe(val => {
          expect(val).toEqual(overview);
          done();
        });

      subscription.unsubscribe();
    })
  ]);

  describe('SELECT_MULTIPLE_OVERVIEWS', () => {
    it('should make an api call as a result of which multipleOverviews$ observable should emit new value', async (done) => {

      const bookId = 1;
      const bookGuid = UUID.UUID();

      let overview = new RatingsOverview({ bookId, bookGuid })
      overview.id = 1;

      const items = [overview];

      spyOn(api, 'getMultipleOverviews')
        .and.returnValue(of(items));

      facade.selectMultipleOverviews([bookId]);

      const subscription = facade.multipleOverviews$([bookId])
        .subscribe(val => {
          expect(val).toEqual(items);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('ADD_RATING', () => {
    it('should make an api call as a result if which addedRating$ observable will emit new value', async (done) => {

      const bookId = 1;
      const userId = 1;
      const guid = UUID.UUID();

      const rating = new Rating(bookId, userId, 4);
      rating.id = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
      overview.id = 1;

      spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

      spyOn(api, 'addRating').and.returnValue(of({}));

      facade.addRating({ id: bookId, guid }, rating, UUID.UUID());

      const subscription = facade.addedRating$
        .subscribe(val => {
          expect(val).toEqual(rating);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('CHANGE_RATING', () => {
    it('should make an api call as a result of which newRating$ and oldRating$ observable will emit new value', async (done) => {
      const bookId = 1;
      const userId = 1;
      const guid = UUID.UUID();

      const rating = new Rating(bookId, userId, 4);
      rating.id = 1;

      let overview = new RatingsOverview({ bookId, bookGuid: UUID.UUID() })
      overview.id = 1;
      overview.addRating(rating);

      spyOn(facade, 'singleOverview$').and.returnValue(of(overview));

      spyOn(api, 'editRating').and.returnValue(of({}));

      const newRating = new Rating(bookId, userId, 5);

      facade.changeRating(overview, newRating);

      const subscription = facade
        .newRating$.subscribe(val => {
          expect(val).toEqual(newRating);
          done();
        });

      subscription.unsubscribe();
    });
  });
});
