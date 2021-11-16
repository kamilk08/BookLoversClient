import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { reviewsStateReducer } from "../..";
import { ReviewsPageFacade } from "../reviews-page.facade";

describe('REVIEWS_PAGE_FACADE', () => {

  let facade: ReviewsPageFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('reviews', reviewsStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        ReviewsPageFacade,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    facade = TestBed.get(ReviewsPageFacade)
  });

  describe('setReaderIdOnReviewsPage', () => {
    it('should dispatch an action and as a result of which readerId$ observable should emit new value', async (done) => {

      const readerId = 1;

      facade.setReaderIdOnReviewsPage(readerId);

      const subscription = facade.readerId$
        .subscribe(val => {
          expect(val).toEqual(readerId);
          done();
        });

      subscription.unsubscribe();

    });

  });

  describe('setPageSize', () => {
    it('should dispatch an action and as a result of which pageSize$ observable should emit new value', async (done) => {

      const pageSize = 20;

      facade.setPageSize(pageSize);

      const subscription = facade.pageSize$.subscribe(val => {
        expect(val).toEqual(pageSize);
        done();
      });

      subscription.unsubscribe();

    })
  });

});
