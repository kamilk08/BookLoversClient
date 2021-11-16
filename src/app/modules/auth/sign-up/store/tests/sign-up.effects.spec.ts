import { HttpClientModule, HttpErrorResponse } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { provideMockActions } from "@ngrx/effects/testing"
import { Action } from "@ngrx/store"
import { Observable, of } from "rxjs"
import { TestScheduler } from "rxjs/testing"
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api"
import { SignUpEffects } from "../sign-up.effects"

import * as fromActions from '../sign-up.actions';
import { SignUpModel } from "src/app/modules/api/auth/sign-up/models/sign-up.model"
import { MOVE_TO } from "src/app/modules/router/state/router.actions"
import { ApiError } from "src/app/modules/api/api-error.model"
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service"
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter"
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade"
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade"
import { provideMockStore } from "@ngrx/store/testing"
import { SignUpModuleState } from ".."

describe('sign up effects', () => {
  let effects: SignUpEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let api: SignUpApi;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SignUpApi, SignUpEffects,
        ErrorActions,
        ApiErrorAdapter,
        ErrorsFacade,
        provideMockStore<SignUpModuleState>({}),
        provideMockActions(() => actions$),
        MesssagesFacade,
        ApiErrorAdapter
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })

    api = TestBed.get(SignUpApi);
    effects = TestBed.get(SignUpEffects);
  });

  describe('signUp$', () => {
    it('should dispatch SIGN_UP_SUCCESS when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(api, 'signUp').and.returnValue(of(null));

        const model = new SignUpModel('username', 'email', 'password');

        const action = fromActions.SIGN_UP({ payload: { signUpModel: model } });
        const completion = fromActions.SIGN_UP_SUCCESS();

        actions$ = hot('a', { a: action });

        expectObservable(effects.signUp$)
          .toBe('b', { b: completion })
      })

    });

    it('should dispatch SIGN_UP_FALIURE when api cal was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const model = new SignUpModel('username', 'email', 'password');
        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const action = fromActions.SIGN_UP({ payload: { signUpModel: model } });
        const completion = fromActions.SIGN_UP_FALIURE({ payload: { error } });

        actions$ = hot('-a', { a: action });

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'signUp').and.returnValue(response);

        expectObservable(effects.signUp$)
          .toBe('--b', { b: completion });
      });
    });
  });

  describe('signUpSuccess$', () => {
    it('should dispatch MOVE_TO action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SIGN_UP_SUCCESS();
        const completion = MOVE_TO({ payload: { moveTo: { path: ['verify_account'] } } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.signUpSucces$)
          .toBe('b', { b: completion })
      });
    })
  });
})
