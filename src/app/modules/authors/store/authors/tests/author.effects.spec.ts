import { HttpClientModule, HttpErrorResponse } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects"
import { provideMockActions } from "@ngrx/effects/testing"
import { Action, StoreModule } from "@ngrx/store"
import { Observable, of } from "rxjs"
import { TestScheduler } from "rxjs/testing"
import { AuthorApi } from "src/app/modules/api/authors/authors/author.api"
import { authorsModuleReducer } from "../.."
import { AuthorEffects } from "../author.effects"

import * as fromActions from '../author.actions';
import { Author } from "src/app/modules/api/authors/authors/models/author.model"
import { ApiModule } from "src/app/modules/api/api.module"
import { ApiError } from "src/app/modules/api/api-error.model"
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter"
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model"
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model"
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model"
import { FullName, Sex } from "src/app/modules/shared"
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service"
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade"
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade"
import { provideMockStore } from "@ngrx/store/testing"
import { AuthorsState } from "../author.reducer"

describe('author effects tests', () => {

  let effects: AuthorEffects;
  let api: AuthorApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AuthorEffects])
      ],
      providers: [
        AuthorEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockStore<AuthorsState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AuthorEffects);
    api = TestBed.get(AuthorApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  })

  describe('when selectAuthor$ is triggered', () => {
    it('should dispatch FETCH_AUTHOR when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const authorId = 1;
        const userId = 1;

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        spyOn(api, 'getAuthorById').and.returnValue(of(author));

        const action = fromActions.SELECT_AUTHOR({ payload: { id: 1 } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_AUTHOR({ payload: { author } });

        expectObservable(effects.selectAuthor$)
          .toBe('b', { b: completion });

      });
    });

    it('should dispatch FETCH_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        let author: Author = undefined;

        const action = fromActions.SELECT_AUTHOR({ payload: { id: 1 } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', { author }, new HttpErrorResponse({ error }));

        spyOn(api, 'getAuthorById').and.returnValue(response);

        const completion = fromActions.FETCH_AUTHOR_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectAuthor$)
          .toBe('--b', { b: completion });
      })
    });

  });

  describe('when selectMultipleAuthors$ is triggered', () => {
    it('should dispatch FETCH_MULTIPLE_AUTHORS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_MULTIPLE_AUTHORS_BY_IDS({ payload: { ids: [1] } });

        actions$ = hot('a', { a: action });

        spyOn(api, 'getMultipleAuthorsById').and.returnValue(of([]));

        const completion = fromActions.FETCH_MULTIPLE_AUTHORS({ payload: { authors: [] } });

        expectObservable(effects.selectMultipleAuthors$)
          .toBe('b', { b: completion });
      })

    });

    it('should dispatch FETCH_AUTHOR_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_MULTIPLE_AUTHORS_BY_IDS({ payload: { ids: [1] } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', { authors: [] }, new HttpErrorResponse({ error }));

        spyOn(api, 'getMultipleAuthorsById').and.returnValue(response);

        const completion = fromActions.FETCH_AUTHOR_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectMultipleAuthors$)
          .toBe('--b', { b: completion });
      });

    });
  });

})
