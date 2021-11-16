import { HttpClientModule } from "@angular/common/http";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { take } from "rxjs/operators";
import { TokenRefreshApi } from "src/app/modules/api/auth/refreshing-tokens/token-refresh.api";
import { RefreshTokenEffects } from "../refresh-token.effects";
import { RefreshTokenFacade } from "../refresh-token.facade";

import * as fromModule from '../../index';
import { of } from "rxjs";
import { CookiesService } from "../../../services/cookies.service";
import { TokenService } from "../../../services/token.service";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('Refresh token facade', () => {
  let refreshTokenFacade: RefreshTokenFacade;
  let refreshTokenApi: TokenRefreshApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('refresh-token', fromModule.refreshTokenModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([RefreshTokenEffects]),
      ],
      providers: [RefreshTokenFacade,
        TokenRefreshApi, TokenService, CookiesService,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    refreshTokenFacade = TestBed.get(RefreshTokenFacade);
    refreshTokenApi = TestBed.get(TokenRefreshApi);

  });

  describe('isRefreshing$', () => {
    it('should initially return false', fakeAsync(() => {
      let isRefreshing: boolean = undefined;

      const subscription = refreshTokenFacade.isRefreshing$
        .pipe(
          take(1)
        ).subscribe(v => isRefreshing = v);

      tick(3000);

      expect(isRefreshing).toBeFalsy();

      subscription.unsubscribe();
    }));
  });

  describe('refreshToken$', () => {
    it('should return new refresh token after invoking refreshToken method', () => {
      let token: string = undefined;
      const jsonToken = {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refresh_token: '',
        token_type: 'JWT',
        expires_in: 1516239022
      };
      spyOn(refreshTokenApi, 'refresh').and.returnValue(of(jsonToken));

      refreshTokenFacade.refresh('token');

      refreshTokenFacade.refreshToken$
        .pipe(
        ).subscribe(v => token = v);

      expect(token).toBe(jsonToken.refresh_token);

    })
  });

});


