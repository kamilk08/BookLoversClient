import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, StoreModule } from '@ngrx/store';
import { Observable, of, scheduled } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ApiModule } from 'src/app/modules/api/api.module';
import { AuthorFollowersApi } from 'src/app/modules/api/authors/author-followers/author-followers.api';
import { AuthorBasics } from 'src/app/modules/api/authors/authors/models/author-basics.model';
import { AuthorDescription } from 'src/app/modules/api/authors/authors/models/author-description.model';
import { AuthorDetails } from 'src/app/modules/api/authors/authors/models/author-details.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ErrorActions } from 'src/app/modules/errors/services/error-actions.service';
import { ErrorsFacade } from 'src/app/modules/errors/store/errors.facade';
import { FullName, Sex } from 'src/app/modules/shared';
import { SHOW_SUCCESS_MESSAGE } from 'src/app/modules/shared/store/messages/actions';
import { MesssagesFacade } from 'src/app/modules/shared/store/messages/message.facade';
import { authorsModuleReducer } from '../..';
import { ADD_OR_UPDATE_AUTHOR } from '../../authors/author.actions';
import * as fromActions from '../unfollow-author/unfollow-author.actions';
import { UnFollowAuthorEffects } from '../unfollow-author/unfollow-author.effects';

describe('unfollow author effects', () => {

  let effects: UnFollowAuthorEffects;
  let api: AuthorFollowersApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([UnFollowAuthorEffects]),
      ],
      providers: [
        UnFollowAuthorEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(UnFollowAuthorEffects);
    api = TestBed.get(AuthorFollowersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('unFollowAuthor$', () => {
    it('should dispatch two actions UNFOLLOW_AUTHOR_SUCCESS and UPSERT_AUTHOR when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;
        const authorId = 1;

        spyOn(api, 'unFollowAuthor').and.returnValue(of({}));

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        const action = fromActions.UNFOLLOW_AUTHOR({ payload: { author, userId } });

        actions$ = hot('a', { a: action });

        const authorSuccessAction = fromActions.UNFOLLOW_AUTHOR_SUCCESS();
        const upsertAuthor = ADD_OR_UPDATE_AUTHOR({ payload: { author, authorId } });

        expectObservable(effects.unFollowAuthor$)
          .toBe('(bc)', {
            b: authorSuccessAction,
            c: upsertAuthor
          });
      })


    });

    it('should dispatch UNFOLLOW_AUTHOR_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const userId = 1;
        const authorId = 1;

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

        author.identification.id = authorId;

        const action = fromActions.UNFOLLOW_AUTHOR({
          payload: {
            author, userId
          }
        });

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'unFollowAuthor').and.returnValue(response);

        const completion = fromActions.UNFOLLOW_AUTHOR_FALIURE({
          payload: {
            author, userId, model: error
          }
        });

        expectObservable(effects.unFollowAuthor$)
          .toBe('--b', {
            b: completion
          });
      })

    })
  });

  describe('unFollowAuthorSuccess$', () => {
    it('should dispatch SHOW_SUCCESS_MESSAGE action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.UNFOLLOW_AUTHOR_SUCCESS();

        actions$ = hot('a', { a: action });

        const completion = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author unfollowed 😊' } });

        expectObservable(effects.unFollowAuthorSuccess$)
          .toBe('b', { b: completion })
      });
    });
  });

});


