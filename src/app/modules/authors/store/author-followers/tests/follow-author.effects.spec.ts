import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { AuthorFollowersApi } from "src/app/modules/api/authors/author-followers/author-followers.api";
import { authorsModuleReducer } from "../..";
import { FollowAuthorEffects } from "../follow-author/follow-author.effects"

import * as fromActions from '../follow-author/follow-author.actions';
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model";
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model";
import { FullName, Sex } from "src/app/modules/shared";
import { ADD_OR_UPDATE_AUTHOR } from "../../authors/author.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('follow-author', () => {

  let effects: FollowAuthorEffects;
  let api: AuthorFollowersApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([FollowAuthorEffects])
      ],
      providers: [FollowAuthorEffects,
        AuthorFollowersApi,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(FollowAuthorEffects);
    api = TestBed.get(AuthorFollowersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });


  describe('followAuthor$', () => {
    it('should dispatch FOLLOW_AUTHOR_SUCCESS and UPSERT_AUTHOR action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {
        const userId = 1;
        const authorId = 1;

        spyOn(api, 'followAuthor').and.returnValue(of({}));

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        const action = fromActions.FOLLOW_AUTHOR({
          payload: {
            author, userId
          }
        });

        const followAuthorSuccssAction = fromActions.FOLLOW_AUTHOR_SUCCESS();
        const upsertAuthorAction = ADD_OR_UPDATE_AUTHOR({ payload: { author, authorId } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.followAuthor$)
          .toBe('(bc)', {
            b: followAuthorSuccssAction,
            c: upsertAuthorAction
          });

      });
    });

    it('should dispatch FOLLOW_AUTHOR_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;
        const authorId = 1;

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        const action = fromActions.FOLLOW_AUTHOR({
          payload: {
            author, userId
          }
        });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'followAuthor').and.returnValue(response);

        const completion = fromActions.FOLLOW_AUTHOR_FALIURE({ payload: { author, userId, model: error } });

        expectObservable(effects.followAuthor$)
          .toBe('--b', { b: completion });
      })

    })
  });


  describe('followAuthorSuccess$', () => {
    it('should dispatch SHOW_SUCCESS_MESSAGE action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.FOLLOW_AUTHOR_SUCCESS();

        actions$ = hot('a', { a: action });

        const completion = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author followed 😊' } })

        expectObservable(effects.followAuthorSuccess$)
          .toBe('b', { b: completion });
      });
    })
  })

})
