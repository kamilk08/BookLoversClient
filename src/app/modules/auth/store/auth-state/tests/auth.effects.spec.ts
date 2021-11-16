import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { UserAdapter } from "src/app/modules/api/auth/user.adapter";
import { authModuleReducer } from "../..";
import { AuthenticationEffects } from "../auth.effects";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { CookiesService } from "../../../services/cookies.service";
import { TokenService } from "../../../services/token.service";
import * as fromActions from '../auth.actions';

describe('auth effects', () => {
  let effects: AuthenticationEffects;
  let adapter: UserAdapter;
  let tokenService: TokenService;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', authModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [UserAdapter, TokenService, CookiesService,
        provideMockActions(() => actions$),
        AuthenticationEffects
      ]
    });

    effects = TestBed.get(AuthenticationEffects);
    adapter = TestBed.get(UserAdapter);
    tokenService = TestBed.get(TokenService);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  })

  describe('assignUser$', () => {
    it('should dispatch ASSIGN_USER_SUCCESS when user token is valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        spyOn(tokenService, 'getDecodedToken').and.returnValue({} as any);
        spyOn(adapter, 'adapt').and.returnValue({} as any);

        const action = fromActions.ASSIGN_USER();
        const completion = fromActions.ASSIGN_USER_SUCCESS({ payload: { user: {} as any } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.assignUser$)
          .toBe('b', { b: completion });
      })
    });

    it('should dispatch ASSIGN_USER_FALIURE when user token is invalid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ASSIGN_USER();

        actions$ = hot('a', { a: action });

        spyOn(tokenService, 'getDecodedToken').and.returnValue({} as any);
        spyOn(adapter, 'adapt').and.returnValues(undefined);

        const completion = fromActions.ASSIGN_USER_FALIURE({ payload: { error: 'Invalid or missing token' } });

        expectObservable(effects.assignUser$)
          .toBe('b', { b: completion })
      })
    });
  });

  describe('logout$', () => {
    it('should dispatch LOGOUT_SUCCESS when user logout succesfully.', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.LOGOUT();
        const completion = fromActions.LOGOUT_SUCCESS();

        actions$ = hot('a', { a: action });

        expectObservable(effects.logout$)
          .toBe('b', { b: completion });
      })
    });
  })

  describe('logoutSuccess$', () => {
    it('should dispatch MOVE_TO action after user was logout successfully', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.LOGOUT_SUCCESS();
        const completion = MOVE_TO({ payload: { moveTo: { path: ['sign_in'] } } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.logoutSuccess$)
          .toBe('b', { b: completion })
      })
    })
  })

});
