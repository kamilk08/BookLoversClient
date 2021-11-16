import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/internal/testing/TestScheduler";
import { TokenRefreshApi } from "src/app/modules/api/auth/refreshing-tokens/token-refresh.api";
import { RefreshTokenEffects } from "../refresh-token.effects";
import * as fromActions from '../refresh-token.actions';
import { provideMockStore } from "@ngrx/store/testing";
import { RefreshTokenState } from "../..";
import { HttpClientModule } from "@angular/common/http";
import { ASSIGN_USER } from "../../../store/auth-state/auth.actions";
import { CookiesService } from "../../../services/cookies.service";
import { TokenService } from "../../../services/token.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";

describe('Refresh token effects', () => {
  let effects: RefreshTokenEffects;
  let actions$ = new Observable<Action>();
  let scheduler: TestScheduler;
  let api: TokenRefreshApi;

  const token = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh_token: '',
    token_type: 'JWT',
    expires_in: 1516239022
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<RefreshTokenState>({}),
        RefreshTokenEffects,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        TokenRefreshApi, TokenService, CookiesService]
    });
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    effects = TestBed.get(RefreshTokenEffects);
    api = TestBed.get(TokenRefreshApi);
  })

  describe('refreshToken$', () => {
    describe('when refresh token action was dispatched', () => {
      it('then should dispatch REFRESH_TOKEN_SUCCESS action when token from api is not null', () => {

        spyOn(api, 'refresh').and.returnValue(of(token));

        scheduler.run(({ hot, cold, expectObservable }) => {
          const action = fromActions.REFRESH_TOKEN({ payload: { refreshToken: token.refresh_token } });
          const completion = fromActions.REFRESH_TOKEN_SUCCESS({ payload: { refreshToken: action.payload.refreshToken } });

          actions$ = hot('a', { a: action });

          expectObservable(effects.refreshToken$).toBe('b', { b: completion });
        });

      });

    })
  });

  describe('refershTokenSuccess$', () => {
    describe('when REFRESH_TOKEN_SUCCESS was dispatched', () => {
      it('then should dispatch two actions of type ASSIGN_USER and SET_REFRESH_TOKEN', () => {

        scheduler.run(({ hot, cold, expectObservable }) => {
          const action = fromActions.REFRESH_TOKEN_SUCCESS({ payload: { refreshToken: token.refresh_token } });
          const assignUserAction = ASSIGN_USER();

          actions$ = hot('a', { a: action });

          expectObservable(effects.refershTokenSuccess$)
            .toBe('b', {
              b: assignUserAction
            })
        })
      });
    })
  })


});

