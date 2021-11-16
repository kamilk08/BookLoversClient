import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { RemoveAuthorApi } from "src/app/modules/api/authors/remove-author/remove-author.api";
import { authorsModuleReducer } from "../..";
import { RemoveAuthorEffects } from "../remove-author.effects";

import * as fromActions from '../remove-author.actions';
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model";
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { FullName, Sex } from "src/app/modules/shared";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('remove author effects', () => {

  let effects: RemoveAuthorEffects;
  let api: RemoveAuthorApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RemoveAuthorEffects])
      ],
      providers: [
        RemoveAuthorEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });
    api = TestBed.get(RemoveAuthorApi);
    effects = TestBed.get(RemoveAuthorEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('when removeAuthor$ is triggered', () => {

    it('when api call was successfull should dispatch REMOVE_AUTHOR_SUCCESS', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(api, 'removeAuthor').and.returnValue(of({}))

        const authorId = 1;
        const userId = 1;

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        const action = fromActions.REMOVE_AUTHOR({ payload: { author } });
        const completion = fromActions.REMOVE_AUTHOR_SUCCESS();

        actions$ = hot('a', { a: action });

        expectObservable(effects.removeAuthor$)
          .toBe('b', { b: completion });
      })
    });

    it('when api call was not successfull should dispatch REMOVE_AUTHOR_FALIURE', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const authorId = 1;
        const userId = 1;

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        const action = fromActions.REMOVE_AUTHOR({ payload: { author } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'removeAuthor').and.returnValue(response);

        const completion = fromActions.REMOVE_AUTHOR_FALIURE({ payload: { model: error } });

        expectObservable(effects.removeAuthor$)
          .toBe('--b', { b: completion });
      });
    });
  });

  describe('when removeAuthorSuccess$ is triggered', () => {
    it('should dispatch SHOW_SUCCESS_MESSAGE', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.REMOVE_AUTHOR_SUCCESS();
        const completion = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author removed succesfully.😊' } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.removeAuthorSuccess$)
          .toBe('b', { b: completion });
      })
    })
  });


})
