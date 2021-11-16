import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcasesWithBookEffects } from "../bookcases-with-book.effects";

import * as fromActions from '../bookcases-with-book.actions'
import { BookcaseStatisticsApi } from "src/app/modules/api/bookcases/statistics/bookcase-statistics.api";
import { of } from "rxjs";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { BookcasesWithBook } from "../bookcases-with-book.reducer";

describe('BOOKCASESES_WITH_BOOK_EFFECTS', () => {

  let effects: BookcasesWithBookEffects;
  let api: BookcaseStatisticsApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ApiModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<BookcasesWithBook>(),
        BookcasesWithBookEffects,
        ApiErrorAdapter,
        MesssagesFacade,
        ErrorActions,
        ErrorsFacade
      ]
    });

    effects = TestBed.get(BookcasesWithBookEffects);
    api = TestBed.get(BookcaseStatisticsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_BOOKCASES_WITH_BOOK$', () => {
    it('should assign FETCH_BOOKCASE_WITH_BOOK action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOKCASES_WITH_BOOK({ payload: { bookId: 1 } });

        spyOn(api, 'getBookcasesWithBook').and.returnValue(of([]))

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_BOOKCASE_WITH_BOOK({ payload: { bookId: 1, bookcasesIds: [] } });

        expectObservable(effects.selectBookcasesWithBook$)
          .toBe('b', { b: completion });

      });
    });

    it('should assign BOOKCASE_WITH_BOOK_FETCH_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOKCASES_WITH_BOOK({ payload: { bookId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getBookcasesWithBook').and.returnValue(response as any);

        const completion = fromActions.BOOKCASE_WITH_BOOK_FETCH_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectBookcasesWithBook$)
          .toBe('-b', { b: completion });
      });

    })
  })

});
