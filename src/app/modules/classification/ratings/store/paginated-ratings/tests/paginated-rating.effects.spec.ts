import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsApi } from "src/app/modules/api/ratings/ratings.api";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { FETCH_MULTIPLE_RATINGS } from "../../ratings.actions";

import * as fromActions from '../paginated-ratings.actions';
import { PaginatedRatingsEffects } from "../paginated-ratings.effects";

describe('PAGINATED_RATINGS_EFFECTS', () => {

  let scheduler: TestScheduler;
  let api: RatingsApi;
  let effects: PaginatedRatingsEffects;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        PaginatedRatingsEffects,
        ApiErrorAdapter,
        provideMockActions(() => actions$)
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    api = TestBed.get(RatingsApi);
    effects = TestBed.get(PaginatedRatingsEffects);
  });

  describe('SELECT_USER_PAGINATED_RATINGS$', () => {
    it('should dispatch two actions. First of type FETCH_PAGINATED_USER_RATINGS. Second FETCH_MULTIPLE_RATINGS', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {
        const userId = 1;
        const bookId = 1;
        const stars = 4;
        const rating = new Rating(bookId, userId, stars);

        const response: PageResult = {
          items: [rating],
          totalItems: 1,
          page: 0,
          pagesCount: 1
        };

        spyOn(api, 'getUserRatings').and.returnValue(of(response));

        const action = fromActions.SELECT_PAGINATED_USER_RATINGS({ payload: { userId, query: DEFAULT_QUERY() } });

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.FETCH_PAGINATED_USER_RATINGS({ payload: { ratings: response.items, pageResult: response } });
        const secondAction = FETCH_MULTIPLE_RATINGS({ payload: { ratings: response.items } });

        expectObservable(effects.selectUserPaginatedRatings$)
          .toBe('(bc)', { b: firstAction, c: secondAction });
      })

    });

  })

});
