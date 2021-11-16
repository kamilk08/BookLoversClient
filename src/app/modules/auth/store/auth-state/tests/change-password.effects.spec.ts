import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { AuthApi } from "src/app/modules/api/auth/auth.api";
import { authModuleReducer } from "../..";
import { ChangePasswordEffects } from "../change-password/change-password.effects";

import * as fromActions from '../change-password/change-password.actions';
import { ChangePassword } from "src/app/modules/api/auth/models/change-password.model";
import { SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ChangePasswordState } from "../change-password/change-password.reducer";

describe('change password effects', () => {
  let effects: ChangePasswordEffects;
  let api: AuthApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ChangePasswordEffects])

      ],
      providers: [AuthApi, ChangePasswordEffects,
        ApiErrorAdapter, ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        ErrorActions,
        provideMockStore<ChangePasswordState>(),
        provideMockActions(() => actions$)]
    });

    effects = TestBed.get(ChangePasswordEffects);
    api = TestBed.get(AuthApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  })

  describe('changePassword$', () => {
    it('should dispatch CHANGE_PASSWORD_SUCCESS action when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        spyOn(api, 'changePassword').and.returnValue(of({}));

        const model = new ChangePassword('email', 'username', 'password', 'password');
        const action = fromActions.CHANGE_PASSWORD({ payload: { model } });
        const completion = fromActions.CHANGE_PASSWORD_SUCCESS();

        actions$ = hot('a', { a: action });

        expectObservable(effects.changePassword$)
          .toBe('b', { b: completion });
      });
    });

    it('should dispatch CHANGE_PASSWORD_FALIURE action when api call was not successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }


        const model = new ChangePassword('email', 'username', 'password', 'password');
        const action = fromActions.CHANGE_PASSWORD({ payload: { model } });

        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'changePassword').and.returnValue(response);

        const completion = fromActions.CHANGE_PASSWORD_FALIURE({ payload: { error } })

        expectObservable(effects.changePassword$)
          .toBe('--b', { b: completion });
      })
    })
  });

  describe('changePasswordSuccess$', () => {
    it('should dispatch SHOW_SUCCESS_MESSAGE action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action = fromActions.CHANGE_PASSWORD_SUCCESS();
        const completion = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Password changed.😊' } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.changePasswordSuccess$)
          .toBe('b', { b: completion });
      })
    })
  });

});
