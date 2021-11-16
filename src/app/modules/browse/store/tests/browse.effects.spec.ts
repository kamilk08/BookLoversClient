import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { BrowseApi } from "src/app/modules/api/browse/browse.api";
import { browseModuleReducer } from "..";
import { BrowseEffects } from "../browse.effects";
import * as fromActions from '../browse.actions';
import { BrowseCriteria } from "src/app/modules/api/browse/models/browse-criteria.model";
import { Book, BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { UUID } from "angular2-uuid";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { FETCH_MULTIPLE_BOOKS } from "src/app/modules/books/store/book.actions";
import { ApiModule } from "src/app/modules/api/api.module";
import { ALL_SUBCATEGORIES } from "src/app/modules/books/common/categories";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('BROWSE_EFFECTS', () => {

  let effects: BrowseEffects;
  let api: BrowseApi;
  let scheduler: TestScheduler
  let actions$: Observable<Action> = new Observable<Action>();

  let book = new Book(new BookBasics('title', '12345', ALL_SUBCATEGORIES[0]),
    [], new BookPublisher(1, UUID.UUID(), new Date()));
  let model: BrowseCriteria = BrowseCriteria.defaultCriteria();

  let pageResult: PageResult = {
    items: [book],
    page: 0,
    pagesCount: 1,
    totalItems: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('browse', browseModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BrowseEffects])
      ],
      providers: [
        provideMockActions(() => actions$),
        BrowseEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    effects = TestBed.get(BrowseEffects);
    api = TestBed.get(BrowseApi);
  });

  describe('BROWSE_BOOKS$', () => {
    it('should dispatch two actions FETCH_BROWSING_RESULTS and FETCH_MULTIPLE_BOOKS when api call was succesffull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.START_BROWSING({ payload: { model } });

        let stream: any = {
          pageResult: pageResult,
          books: [book]
        }

        spyOn(api, 'searchBooks').and.returnValue(of(stream));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.FETCH_BROWSING_RESULTS({ payload: { pageResult } });
        const secondAction = FETCH_MULTIPLE_BOOKS({ payload: { books: [book] } });

        expectObservable(effects.browseBooks$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      })

    });

    it('should dispatch FETCH_BROWISING_RESULTS_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.START_BROWSING({ payload: { model } });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }
        const response = cold('1s #|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'searchBooks').and.returnValue(response as any);

        actions$ = hot('0.5s a', { a: action });

        const completion = fromActions.FETCH_BROWSING_RESULTS_FALIURE({ payload: { model: error } });

        expectObservable(effects.browseBooks$)
          .toBe('1.5s b', { b: completion });
      });

    });
  });

  describe('FETCH_BROWSING_RESULTS$', () => {

    it('should dispatch FINISH_BROWSING action with 1.5s delay', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.FETCH_BROWSING_RESULTS({ payload: { pageResult } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FINISH_BROWSING();

        expectObservable(effects.fetchBrowsingResults$)
          .toBe('1.5s b', { b: completion });
      })

    });

  });

});

