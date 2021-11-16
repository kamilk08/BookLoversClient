import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { BookcaseEffects } from "../bookcase.effects";

import * as fromActions from '../bookcase.actions';
import { Bookcase } from "../../../models";
import { UUID } from "angular2-uuid";
import { SET_BOOKCASE_SETTINGS } from "../../../bookcase-settings/store/settings/bookcase-settings.actions";
import { SET_BOOKCASE_TO_MANAGE } from "../../../bookcase-preview/store/bookcase-preview.actions";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { BookcasesState } from "../bookcase.reducer";

describe('BOOKCASE_EFFECTS', () => {

  let effects: BookcaseEffects;
  let api: BookcaseApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();
  let authService: AuthService;

  let bookcase: Bookcase;

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<BookcasesState>(),
        BookcaseEffects,
        AuthService,
        TokenService,
        CookiesService,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    effects = TestBed.get(BookcaseEffects);
    api = TestBed.get(BookcaseApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    authService = TestBed.get(AuthService);
  });

  describe('SELECT_BOOKCASE$', () => {
    it('should assign FETCH_BOOKCASE action and SET_BOOKCASE_TO_MANGE when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOKCASE({ payload: { id: 1 } });

        spyOn(api, 'getBookcaseById').and.returnValue(of(bookcase));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.FETCH_BOOKCASE({ payload: { bookcase } });
        const secondAction = SET_BOOKCASE_TO_MANAGE({ payload: { bookcase } });

        expectObservable(effects.selectBookcase$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });
      });
    });

    it('should assign FETCH_BOOKCASE_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_BOOKCASE({ payload: { id: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getBookcaseById').and.returnValue(response as any);

        const completion = fromActions.FETCH_BOOKCASE_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectBookcase$)
          .toBe('-b', { b: completion });
      })
    });
  });

  describe('SELECT_CURRENT_USER_BOOKCASE$', () => {
    it('should assign FETCH_BOOKCASE,SET_BOOKCASE_SETTINGS and SET_BOOKCASE_TO_MANAGE when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_CURRENT_USER_BOOKCASE();

        spyOn(api, 'getBookcaseByUserId').and.returnValue(of(bookcase));

        actions$ = hot('a', { a: action });

        const firstAction = fromActions.FETCH_BOOKCASE({ payload: { bookcase } });
        const secondAction = SET_BOOKCASE_SETTINGS({ payload: { bookcaseId: bookcase.identification.id, settings: bookcase.settings } })
        const thirdAction = SET_BOOKCASE_TO_MANAGE({ payload: { bookcase } });

        expectObservable(effects.selectCurrentUserBookcase$)
          .toBe('(bcd)', {
            b: firstAction,
            c: secondAction,
            d: thirdAction
          });
      })
    });

    it('should assign FETCH_BOOKCASE_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOnProperty(authService, 'userId').and.returnValue(1);

        const action = fromActions.SELECT_CURRENT_USER_BOOKCASE();

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getBookcaseByUserId').and.returnValue(response as any);

        const completion = fromActions.FETCH_BOOKCASE_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectCurrentUserBookcase$)
          .toBe('-b', {
            b: completion
          });

      })

    });
  });

});
