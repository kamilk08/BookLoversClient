import { HttpClientModule } from "@angular/common/http";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { NzMessageService } from "ng-zorro-antd";
import { of } from "rxjs";
import { take } from "rxjs/operators";
import { AuthApi } from "src/app/modules/api/auth/auth.api";
import { User } from "src/app/modules/api/auth/models/user.model";
import { UserAdapter } from "src/app/modules/api/auth/user.adapter";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { authModuleReducer } from "../..";
import { CookiesService } from "../../../services/cookies.service";
import { TokenService } from "../../../services/token.service";
import { AuthenticationEffects } from "../auth.effects";
import { AuthFacade } from "../auth.facade";

describe('auth facade', () => {
  let facade: AuthFacade;
  let adapter: UserAdapter;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AuthenticationEffects]),
        SharedModule
      ],
      providers: [UserAdapter, TokenService, CookiesService,
        AuthenticationEffects, AuthFacade, AuthApi,
        MesssagesFacade, ErrorsFacade,ApiErrorAdapter
      ]
    });

    facade = TestBed.get(AuthFacade);
    adapter = TestBed.get(UserAdapter);
    tokenService = TestBed.get(TokenService);
  });



  describe('loadUser', () => {
    it('should load user and emit new value from user$ observable', () => {
      let user: User = {
        identification: { guid: UUID.UUID(), id: 1 },
        roles: ['user'],
        account: { email: 'foo@gmail.com' }
      }

      spyOn(tokenService, 'getDecodedToken').and.returnValue({} as any);
      spyOn(adapter, 'adapt').and.returnValue(user);

      facade.loadUser();

      let userFromFacade: User;

      const subscription = facade.user$
        .pipe(
          take(1)
        ).subscribe(val => userFromFacade = val);

      expect(userFromFacade).toBeDefined();

      subscription.unsubscribe();
    })
  });

  describe('logout', () => {
    it('should logout user and emit new value from user$ observable', () => {
      let user: User = {
        identification: { guid: UUID.UUID(), id: 1 },
        roles: ['user'],
        account: { email: 'foo@gmail.com' }
      }

      spyOn(tokenService, 'getDecodedToken').and.returnValue({} as any);
      spyOn(adapter, 'adapt').and.returnValue(user);

      facade.loadUser();

      facade.logout();

      let userFromFacade: User;

      const subscription = facade.user$
        .pipe(
          take(1)
        ).subscribe(val => userFromFacade = val);

      expect(userFromFacade).not.toBeDefined();

      subscription.unsubscribe();
    })
  });

});
