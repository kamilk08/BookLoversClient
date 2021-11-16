import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { ApiModule } from "src/app/modules/api/api.module";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsApi } from "src/app/modules/api/ratings/ratings.api";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ratingsStateReducer } from "../..";
import { PaginatedRatingsEffects } from "../paginated-ratings.effects";
import { PaginatedRatingsFacade } from "../paginated-ratings.facade";

describe('PAGINATED_RATINGS_FACADE', () => {
  let facade: PaginatedRatingsFacade;
  let api: RatingsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings', ratingsStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PaginatedRatingsEffects])
      ],
      providers: [
        PaginatedRatingsEffects,
        PaginatedRatingsFacade
      ]
    });

    facade = TestBed.get(PaginatedRatingsFacade);
    api = TestBed.get(RatingsApi);
  });

  describe('SELECT_PAGINATED_USER_RATINGS', () => {
    it('should make an api call and as a result of that call paginatedRatings$ and pageResult$ should emit new values', async (done) => {

      const bookId = 1;
      const userId = 1;
      const stars = 1;
      const rating = new Rating(bookId, userId, stars);

      const response: PageResult = {
        items: [rating],
        totalItems: 1,
        page: 0,
        pagesCount: 1
      };

      spyOn(api, 'getUserRatings').and.returnValue(of(response));

      facade.selectPaginatedUserRatings(userId, DEFAULT_QUERY());

      const subscription = facade.paginatedRatings$
        .pipe(
          withLatestFrom(facade.pageResult$),
          map(stream => {
            return {
              paginatedRatings: stream[0],
              pageResult: stream[1]
            }
          })
        ).subscribe(stream => {
          expect(stream.pageResult).toEqual(response);
          expect(stream.paginatedRatings).toEqual(response.items);
          done();
        })

      subscription.unsubscribe();
    })
  })
});
