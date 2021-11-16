import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { AuthorApi } from "src/app/modules/api/authors/authors/author.api";
import { authorsModuleReducer } from "../..";
import { SearchAuthorEffects } from "../search-author.effects";

import * as fromActions from '../search-author.actions';
import { SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { FETCH_MULTIPLE_AUTHORS } from "../../authors/author.actions";
import { provideMockActions } from "@ngrx/effects/testing";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('search author effects', () => {

  let effects: SearchAuthorEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let api: AuthorApi;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SearchAuthorEffects])
      ],
      providers: [
        SearchAuthorEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SearchAuthorEffects);
    api = TestBed.get(AuthorApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });


  describe('when startFiltering$ is triggered', () => {

    it('should dispatch two actions FETCH_FILTERED_AUTHORS and FETCH_MULTIPLE_AUTHORS when api was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(api, 'findAuthor').and.returnValue(of([]))

        const action = fromActions.START_FILTERING_AUTHORS({ payload: { query: SEARCH_QUERY('phrase') } });

        const fetchFilteredAuthrosAction = fromActions.FETCH_FILTERED_AUTHORS({ payload: { authors: [] } });
        const fetchMultipleAuthors = FETCH_MULTIPLE_AUTHORS({ payload: { authors: [] } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.startFiltering$)
          .toBe('(bc)', {
            b: fetchFilteredAuthrosAction,
            c: fetchMultipleAuthors
          });
      })

    });

    it('should dispatch FILTER_AUTHOR_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.START_FILTERING_AUTHORS({ payload: { query: SEARCH_QUERY('phrase') } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', { authors: undefined }, new HttpErrorResponse({ error }));

        spyOn(api, 'findAuthor')
          .and.returnValue(response);

        const completion = fromActions.FILTER_AUTHOR_FALIURE({ payload: { model: error } });

        expectObservable(effects.startFiltering$)
          .toBe('--b', { b: completion });
      })
    });

  });

  describe('when fetchFilteredAuthors$ is triggered', () => {

    it('should dispatch STOP_FILTERING_AUTHORS action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.FETCH_FILTERED_AUTHORS({
          payload: { authors: [] }
        });

        actions$ = hot('a', { a: action });

        const completion = fromActions.STOP_FILTERING_AUTHORS();

        expectObservable(effects.fetchFilteredAuthors$)
          .toBe('1.5s b', { b: completion });
      })
    })
  })

})
