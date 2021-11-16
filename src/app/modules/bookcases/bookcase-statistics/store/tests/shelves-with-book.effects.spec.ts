import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseStatisticsApi } from "src/app/modules/api/bookcases/statistics/bookcase-statistics.api";
import { ShelvesWithBookEffects } from "../shelves-with-book.effects";

import * as fromActions from '../shelves-with-book.actions';
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ShelvesWithBook } from "../shelves-with-book.reducer";

describe('SHELVES_WITH_BOOK_EFFECTS', () => {

  let effects: ShelvesWithBookEffects;
  let api: BookcaseStatisticsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<ShelvesWithBook>(),
        ShelvesWithBookEffects,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    effects = TestBed.get(ShelvesWithBookEffects);
    api = TestBed.get(BookcaseStatisticsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });


  describe('SELECT_SHELVES_WITH_BOOK$', () => {
    it('it should assign FETCH_SHELVES_WITH_BOOK when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_SHELVES_WITH_BOOK({ payload: { bookId: 1, query: DEFAULT_QUERY() } });

        const pageResult: PageResult = {
          items: [],
          page: 0,
          pagesCount: 0,
          totalItems: 0
        };

        spyOn(api, 'getShelvesWithBook').and.returnValue(of(pageResult));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_SHELVES_WITH_BOOK({ payload: { statistics: pageResult } });

        expectObservable(effects.selectShelvesWithBook$)
          .toBe('b', { b: completion });
      });

    });

  });

});

