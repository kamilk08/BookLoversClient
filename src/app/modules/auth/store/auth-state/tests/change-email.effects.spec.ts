import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { AuthApi } from "src/app/modules/api/auth/auth.api";
import { authModuleReducer } from "../..";
import { ChangeEmailEffects } from "../change-email/change-email.effects";

import * as fromActions from '../change-email/change-email.actions';
import { ChangeEmail } from "src/app/modules/api/auth/models/change-email.model";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { SignInApi } from "src/app/modules/api/auth/sign-in/sign-in.api";
import { TokenService } from "../../../services/token.service";
import { CookiesService } from "../../../services/cookies.service";
import { JsonToken } from "src/app/modules/api/auth/refreshing-tokens/models/json-token.model";
import { provideMockStore } from "@ngrx/store/testing";
import { ChangeEmailState } from "../change-email/change-email.reducer";

describe('change email effects', () => {
  let effects: ChangeEmailEffects;
  let api: AuthApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  let signInApi: SignInApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ChangeEmailEffects])
      ],
      providers: [
        ChangeEmailEffects,
        AuthApi,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        provideMockStore<ChangeEmailState>(),
        provideMockActions(() => actions$),
        MesssagesFacade,
        ErrorsFacade,
        SignInApi,
        TokenService,
        CookiesService
      ]
    })
    effects = TestBed.get(ChangeEmailEffects);
    api = TestBed.get(AuthApi);
    signInApi = TestBed.get(SignInApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  })

  describe('changeEmail$', () => {
    it('should dispatch CHANGE_EMAIL_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        spyOn(api, 'changeEmail').and.returnValue(of({}));

        const model = new ChangeEmail('username', 'password', 'email', 'previousEmail')

        const action = fromActions.CHANGE_EMAIL({ payload: { model } });
        const completion = fromActions.CHANGE_EMAIL_SUCCESS({ payload: { model: model } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.changeEmail$)
          .toBe('b', { b: completion });
      })
    });

    it('should dispatch CHANGE_EMAIL_FALIURE when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }


        const model = new ChangeEmail('username', 'password', 'email', 'previousEmail')
        const action = fromActions.CHANGE_EMAIL({ payload: { model } });

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'changeEmail').and.returnValue(response);

        const completion = fromActions.CHANGE_EMAIL_FALIURE({ payload: { error } });

        expectObservable(effects.changeEmail$)
          .toBe('--b', { b: completion });

      })
    })
  });

  describe('changeEmailSuccess$', () => {
    it('should dispatch SHOW_SUCCESS_MESSAGE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(signInApi,'signIn').and.returnValue(of({} as JsonToken));

        const action = fromActions.CHANGE_EMAIL_SUCCESS({ payload: { model: new ChangeEmail('dupa', 'dupa', 'dupa', 'dupa') } });
        const completion = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Email successfully changed.😊' } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.changeEmailSuccess$)
          .toBe('b', { b: completion });
      })
    });
  });

});



