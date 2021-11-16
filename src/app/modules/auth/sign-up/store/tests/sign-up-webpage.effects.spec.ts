import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api";
import { SignUpWebPageEffects } from "../sign-up-webpage/sign-up-webpage.effects"
import { SignUpFacade } from "../sign-up.facade";
import { signUpReducer } from "../sign-up.reducer";

import * as fromActions from '../sign-up-webpage/sign-up-webpage.actions';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { provideMockActions } from "@ngrx/effects/testing";
import { SIGN_UP } from "../sign-up.actions";
import { SignUpModel } from "src/app/modules/api/auth/sign-up/models/sign-up.model";


describe('sign up webpage effects', () => {
  let effects: SignUpWebPageEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let api: SignUpApi;
  let facade: SignUpFacade;
  let form: FormGroup;
  let signUpModel: SignUpModel;

  beforeEach(() => {
    form = new FormGroup({
      username: new FormControl('', [], []),
      email: new FormControl('', [], []),
      password: new FormControl('', []),
      repeatPassword: new FormControl('', []),
      terms: new FormControl(false, []),
      newsletter: new FormControl(false),
    });

    form.get('username').setValue('username');
    form.get('email').setValue('email');
    form.get('password').setValue('password');
    form.updateValueAndValidity();

    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('sign-up', signUpReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SignUpWebPageEffects])
      ],
      providers: [
        provideMockActions(() => actions$),
        SignUpWebPageEffects,
        {
          provide: SignUpFacade,
          useValue: {
            signUpModel$: of(signUpModel)
          }
        }, SignUpApi
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });

    api = TestBed.get(SignUpApi);
    effects = TestBed.get(SignUpWebPageEffects);
    facade = TestBed.get(SignUpFacade);
  });

  describe('initializeSignUpForm$', () => {
    it('should dispatch two actions of type SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR and SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.INITIALIZE_SIGN_UP_FORM();

        const emailAction = fromActions.SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR({ payload: { api } });
        const userNameAction = fromActions.SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR({ payload: { api } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.initializeSignUpForm$)
          .toBe('(bc)', {
            b: emailAction,
            c: userNameAction
          });
      })
    })
  });

  describe('submitSignUpForm$', () => {
    it('should dispatch SIGN_UP_FORM_VALID when form on action is valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_SIGN_UP_FORM({
          payload: {
            form: form
          }
        });
        const completion = fromActions.SIGN_UP_FORM_VALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitSignUpForm$)
          .toBe('b', { b: completion })
      });
    });

    it('should dispatch SIGN_UP_FORM_INVALID when form on action is not valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        form.get('username').setValidators([Validators.required]);
        form.get('username').setValue(undefined);

        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_SIGN_UP_FORM({ payload: { form } });
        const completion = fromActions.SIGN_UP_FORM_INVALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitSignUpForm$)
          .toBe('b', { b: completion });
      })
    })
  });

  describe('signUpFormValid$', () => {
    it('should dispatch SIGN_UP action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SIGN_UP_FORM_VALID();
        const completion = SIGN_UP({ payload: { signUpModel } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.signUpFormValid$)
          .toBe('b', { b: completion });
      })
    })
  })
})
