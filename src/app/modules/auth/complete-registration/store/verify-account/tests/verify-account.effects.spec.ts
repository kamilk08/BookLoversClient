import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { VerifyAccountModuleState } from "../..";
import { VerifyAccountEffects } from "../verify-account.effects";

import * as fromActions from '../verify-account.actions';
import { VerifyAccount } from "src/app/modules/api/auth/complete-registration/models/account-verification.model";
import { VerifyAccountApi } from "src/app/modules/api/auth/complete-registration/verify-account.api";
import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";


describe('Verify account effects', () => {
  let scheduler: TestScheduler;
  let actions$ = new Observable<Action>();
  let api: VerifyAccountApi;
  let effects: VerifyAccountEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        provideMockStore<VerifyAccountModuleState>({}),
        VerifyAccountEffects,
        ErrorActions,
        ApiErrorAdapter,
        VerifyAccountApi,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
      ]
    })
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    effects = TestBed.get(VerifyAccountEffects);
    api = TestBed.get(VerifyAccountApi);
  });

  describe('When VERIFY_ACCOUNT action dispatched and response is null', () => {
    it('should dispatch VERIFY_ACCOUNT_SUCCESS action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const model = new VerifyAccount('email', 'token');

        const action = fromActions.VERIFY_ACCOUNT({ payload: { model } });

        const completion = fromActions.VERIFY_ACCOUNT_SUCCESS();

        spyOn(api, 'verifyAccount').and.returnValue(of(null));

        actions$ = hot('a', { a: action });

        expectObservable(effects.verifyAccount$)
          .toBe('1.5s b', { b: completion })
      })

    })
  });


  describe('When VERIFY_ACCOUNT is dispatched and there was an error', () => {
    it('should dispatch VERIFY_ACCOUNT_FALIURE action', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {
        const model = new VerifyAccount('email', 'token');

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const action = fromActions.VERIFY_ACCOUNT({ payload: { model } });
        const completion = fromActions.VERIFY_ACCOUNT_FALIURE({ payload: { error } });

        actions$ = hot('a', { a: action });
        const response = cold('#|', {}, new HttpErrorResponse({error}));

        spyOn(api, 'verifyAccount').and.returnValue(response);

        expectObservable(effects.verifyAccount$).toBe('1.5s b', { b: completion })
      })


    })
  });

  describe('When VERIFY_ACCOUNT_SUCCESS is dispatched', () => {
    it('should dispatch two actions which are SHOW_SUCCESS_MESSAGE and MOVE_TO', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.VERIFY_ACCOUNT_SUCCESS();

        const showMessageAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Account verified successfully.😊' } });
        const moveToAction = MOVE_TO({ payload: { moveTo: { path: ['sign_in'] } } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.verifyAccountSuccess$)
          .toBe("(bc)", {
            b: showMessageAction,
            c: moveToAction
          })
      })
    })
  });

})
