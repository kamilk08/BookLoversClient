import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { Credentials } from "src/app/modules/api/auth/sign-in/models/credentials.model";
import { SignInApi } from "src/app/modules/api/auth/sign-in/sign-in.api";
import { MOVE_TO } from "src/app/modules/router/state/router.actions";
import { signInPageReducer } from "..";
import { SET_REFRESH_TOKEN } from "../../../refreshing/store/refresh-token.actions";
import { CookiesService } from "../../../services/cookies.service";
import { TokenService } from "../../../services/token.service";
import { ASSIGN_USER } from "../../../store/auth-state/auth.actions";
import { SignInFacade } from "../sign-in.facade";

import * as fromActions from '../sign-in/sign-in.actions';
import { SignInEffects } from "../sign-in/sign-in.effects";

describe('Sign in effects', () => {
  const form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    remember: new FormControl(true)
  });
  let actions$ = new Observable<Action>();
  let effects: SignInEffects;
  let facade: SignInFacade;
  let api: SignInApi;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('sign-in', signInPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SignInEffects])
      ],
      providers: [
        provideMockActions(() => actions$),
        SignInApi, SignInFacade,
        TokenService, CookiesService, SignInEffects]
    });

    effects = TestBed.get(SignInEffects);
    facade = TestBed.get(SignInFacade);
    api = TestBed.get(SignInApi);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })

  });

  describe('submitSignInForm$', () => {
    describe('when SIGN_IN_FORM action is dipsatched', () => {
      it('should dispatch SIGN_IN_FORM_VALID action when form is valid', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {

          form.get('email').setValue('email');
          form.get('password').setValue('password');

          const action = fromActions.SUBMIT_SIGN_IN_FORM({
            payload: { form }
          });

          const completion = fromActions.SIGN_IN_FORM_VALID();

          actions$ = hot('a', { a: action });

          expectObservable(effects.submitSignInForm$).toBe('b', { b: completion });
        })

      });

      it('should dipsatch SIGN_IN_FORM_INVALID action when form is invalid', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action = fromActions.SUBMIT_SIGN_IN_FORM({
            payload: { form }
          });

          form.get('password').setValue(undefined);
          form.get('email').setValue(undefined);

          form.updateValueAndValidity();

          const completion = fromActions.SIGN_IN_FORM_INVALID();

          actions$ = hot('a', { a: action });

          expectObservable(effects.submitSignInForm$).toBe('b', { b: completion });
        })

      });

    })
  });

  describe('signInFormValid$', () => {
    describe('when SIGN_IN_FORM_VALID is dispatched', () => {
      it('should dispatch SIGN_IN action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {

          const credentials = new Credentials('email', 'password');

          form.get('email').setValue('email');
          form.get('password').setValue('password');

          form.updateValueAndValidity();

          facade.submitForm(form)

          const action = fromActions.SIGN_IN_FORM_VALID();
          const completion = fromActions.SIGN_IN({ payload: { credentials } });

          actions$ = hot('a', { a: action });

          expectObservable(effects.signInFormValid$)
            .toBe('b', { b: completion });
        })
      })
    })
  });

  describe('signIn$', () => {
    describe('when SIGN_IN is dispatched', () => {
      it('should dispatch SIGN_IN_SUCCESS when sign in operation was succesfull', () => {

        scheduler.run(({ hot, cold, expectObservable }) => {

          const credentials = new Credentials('email', 'password');
          const token = {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            refresh_token: '',
            token_type: 'JWT',
            expires_in: 1516239022
          };

          spyOn(api, 'signIn').and.returnValue(of(token));

          const action = fromActions.SIGN_IN({ payload: { credentials } });
          const completion = fromActions.SIGN_IN_SUCCESS({ payload: { token } })

          actions$ = hot('a', { a: action });

          expectObservable(effects.signIn$)
            .toBe('1.5s b', { b: completion });
        })
      });

      it('should dispatch SIGN_IN_FALIURE when sign in operation was not succesfull', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {

          const credentials = new Credentials('email', 'password');
          const action = fromActions.SIGN_IN({ payload: { credentials } });
          const completion = fromActions.SIGN_IN_FALIURE({ payload: { error: 'Invalid credentials' } });

          spyOn(api, 'signIn').and.returnValue(of(null));

          actions$ = hot('a', { a: action });

          expectObservable(effects.signIn$)
            .toBe('1.5s b', { b: completion })
        });
      });

      it('should dispatch SIGN_IN_FALIURE when there was an error while user tried to logged in', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {

          const credentials = new Credentials('email', 'password');
          const action = fromActions.SIGN_IN({ payload: { credentials } });

          const completion = fromActions.SIGN_IN_FALIURE({ payload: { error: 'Invalid credentials' } });

          actions$ = hot('-a', { a: action });

          const response = cold('-#|', {}, { statusText: 'Invalid credentials' });

          spyOn(api, 'signIn').and.returnValue(response as any);

          expectObservable(effects.signIn$).toBe('1.5s --b', { b: completion });
        })

      })
    })
  });

  describe('signInSuccess$', () => {
    describe('when SIGN_IN_SUCCESS was dispatched', () => {
      it('should dispatch three other actions, which are ASSIGN_USER,SET_REFRESH_TOKEN and MOVE_TO', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const token = { refresh_token: 'refresh_token' };
          const action = fromActions.SIGN_IN_SUCCESS({ payload: { token } });

          const assignUserAction = ASSIGN_USER();
          const setRefreshToken = SET_REFRESH_TOKEN({ payload: { refreshToken: 'refresh_token' } });
          const moveToAction = MOVE_TO({ payload: { moveTo: { path: ['home'] } } });

          actions$ = hot('a', { a: action });

          expectObservable(effects.signInSuccess$)
            .toBe('(bcd)', {
              b: assignUserAction,
              c: setRefreshToken,
              d: moveToAction
            });
        })
      })
    })
  });

  describe('signInFaliure$', () => {
    describe('when SIGN_IN_FALIURE was dispatched', () => {
      it('should dispatch SET_SIGN_IN_ERROR_ON_FORM action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {

          const action = fromActions.SIGN_IN_FALIURE({ payload: { error: 'error' } });
          const completion = fromActions.SET_SIGN_IN_ERROR_ON_FORM();

          actions$ = hot('a', { a: action });

          expectObservable(effects.signInFaliure$)
            .toBe('b', { b: completion });

        })
      })
    })
  })

});
