import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsApi } from "src/app/modules/api/ratings/ratings.api";
import { ratingsStateReducer } from "..";
import { GroupedRatingsEffects } from "../grouped-ratings/grouped-ratings.effects";
import { RatingsEffects } from "../ratings.effects";
import { RatingsFacade } from "../ratings.facade"

describe('RATINGS_FACADE', () => {

  let facade: RatingsFacade;
  let api: RatingsApi;
  const bookId = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings', ratingsStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RatingsEffects, GroupedRatingsEffects])
      ],
      providers: [
        RatingsFacade,
        RatingsEffects,
        GroupedRatingsEffects,
        ApiErrorAdapter
      ]
    });

    facade = TestBed.get(RatingsFacade);
    api = TestBed.get(RatingsApi);
  });

  describe('SELECT_GROUPED_RATINGS', () => {
    it('should make an api call in which result groupedRatings$ should emit new value', async (done) => {

      const groupedRatings = {
        1: 1,
        2: 2
      };

      const response = {
        bookId: bookId,
        ratings: groupedRatings
      };

      spyOn(api, 'getGroupedRatings').and.returnValue(of(response));

      facade.selectGroupedRatings(bookId);

      const subscription = facade.groupedRatings$(bookId)
        .subscribe(val => {
          expect(val).toEqual(groupedRatings);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_USER_RATING', () => {
    it('should make an api call in which result singleRating$ observable should emit new value', async (done) => {

      let userId = 1;

      const rating = new Rating(bookId, userId, 4);

      spyOn(api, 'getUserBookRating').and.returnValue(of(rating));

      facade.selectUserRating(userId, bookId);

      const subscription = facade.singleRating$(bookId, userId)
        .subscribe(val => {
          expect(val).toEqual(rating);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_MULTIPLE_USER_RATINGS', () => {
    it('should make an api call in which result multipleRatings$ observable should emit new value', async (done) => {

      let userId = 1;

      const rating = new Rating(bookId, userId, 4);

      spyOn(api, 'getMultipleRatings').and.returnValue(of([rating]));

      facade.selectMultipleUserRatings(userId, [bookId]);

      const subscription = facade.multipleRatings$(userId, [bookId])
        .subscribe(val => {
          expect(val[0]).toEqual(rating);
          done();
        });

      subscription.unsubscribe();
    });

  });

})
