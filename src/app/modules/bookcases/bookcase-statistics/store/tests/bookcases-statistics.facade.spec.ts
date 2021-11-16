import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseStatisticsApi } from "src/app/modules/api/bookcases/statistics/bookcase-statistics.api";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { bookcaseStatisticsModuleReducer } from "..";
import { BookcaseStatisticsFacade } from "../bookcase-statistics.facade";
import { BookcasesWithBookEffects } from "../bookcases-with-book.effects";
import { ShelvesWithBookEffects } from "../shelves-with-book.effects";

describe('BOOKCASES_STATISTICS_FACADE', () => {

  let facade: BookcaseStatisticsFacade;
  let api: BookcaseStatisticsApi;

  const bookId: number = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('bookcase-statistics', bookcaseStatisticsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BookcasesWithBookEffects, ShelvesWithBookEffects])
      ],
      providers: [
        BookcaseStatisticsFacade,
        BookcasesWithBookEffects,
        ShelvesWithBookEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    facade = TestBed.get(BookcaseStatisticsFacade);
    api = TestBed.get(BookcaseStatisticsApi);
  });

  describe('SELECT_SHELFS_WITH_BOOK', () => {
    it('should dispatch an action and as a result of which bookOnShelfs$ observable should emit new value', async (done) => {

      const pageResult: PageResult = {
        items: [1],
        totalItems: 1,
        page: 0,
        pagesCount: 1
      }

      spyOn(api, 'getShelvesWithBook').and.returnValue(of(pageResult));

      facade.selectShelvesWithBook(bookId, DEFAULT_QUERY());

      const subscription = facade.bookOnShelves$.subscribe(val => {
        expect(val).toEqual(pageResult.items);
        done();
      });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_BOOKCASES_WITH_BOOK', () => {
    it('should dispatch an action and as a result of which', async (done) => {

      const items = [1];

      spyOn(api, 'getBookcasesWithBook').and.returnValue(of(items))

      facade.selectBookcasesWithBook(bookId);

      const subscription = facade.bookcasesWithBook$(bookId)
        .subscribe(val => {
          expect(val).toEqual(items);
          done();
        });

      subscription.unsubscribe();

    })

  });

});
