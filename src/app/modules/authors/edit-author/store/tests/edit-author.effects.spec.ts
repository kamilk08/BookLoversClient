import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { EditAuthorApi } from "src/app/modules/api/authors/edit-author/edit-author.api";
import { AuthModule } from "src/app/modules/auth/auth.module";
import { editAuthorModuleReducer } from "..";
import { EditAuthorEffects } from "../edit-author-state/edit-author.effects";

import * as fromActions from '../edit-author-state/edit-author.actions';
import { TestScheduler } from "rxjs/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model";
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { FullName, Sex } from "src/app/modules/shared";
import { UUID } from "angular2-uuid";
import { ADD_OR_UPDATE_AUTHOR } from "../../../store/authors/author.actions";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";


describe('Edit author effects', () => {

  let effects: EditAuthorEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let api: EditAuthorApi;
  let scheduler: TestScheduler;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        AuthModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('edit-author', editAuthorModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([EditAuthorEffects])
      ],
      providers: [
        EditAuthorEffects,
        ErrorActions,
        ApiErrorAdapter,
        ErrorsFacade,
        AuthService,
        TokenService,
        CookiesService,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(EditAuthorEffects);
    api = TestBed.get(EditAuthorApi);
    authService = TestBed.get(AuthService);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  })

  describe('editAuthor$', () => {
    it('should return two actions of type EDIT_AUTHOR_SUCCESS AND UPSERT_AUTHOR when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOnProperty(authService, 'userGuid', 'get').and.returnValue(UUID.UUID().toString())
        spyOn(api, 'editAuthor').and.returnValue(of({}))

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

        author.identification.id = 1;

        const action = fromActions.EDIT_AUTHOR({ payload: { author, oldAuthor: author, image: null } })

        const successAction = fromActions.EDIT_AUTHOR_SUCCESS();
        const upsertAciton = ADD_OR_UPDATE_AUTHOR({ payload: { author, authorId: author.identification.id } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.editAuthor$)
          .toBe('(ab)', {
            a: successAction,
            b: upsertAciton
          });
      });
    });

    it('should return edit author faliure when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        spyOnProperty(authService, 'userGuid', 'get').and.returnValue(UUID.UUID().toString())

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
          new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

        author.identification.id = 1;

        const action = fromActions.EDIT_AUTHOR({ payload: { author, oldAuthor: author, image: null } });

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'editAuthor').and.returnValue(response);

        const completion = fromActions.EDIT_AUTHOR_FALIURE({ payload: { author, model: error } });

        expectObservable(effects.editAuthor$)
          .toBe('--b', { b: completion });
      });

    })
  });

  describe('editAuthorSuccess$', () => {
    it('should dispatch SHOW_SUCCESS_MESSAGE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_AUTHOR_SUCCESS();
        const completion = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Author edited succesfully! 😊' } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.editAuthorSuccess$)
          .toBe('b', { b: completion });
      })
    })
  });


});
