import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { filter, take } from "rxjs/operators";
import { Credentials } from "src/app/modules/api/auth/sign-in/models/credentials.model";
import { SignInApi } from "src/app/modules/api/auth/sign-in/sign-in.api";
import { signInPageReducer } from "..";
import { CookiesService } from "../../../services/cookies.service";
import { TokenService } from "../../../services/token.service";
import { SignInFacade } from "../sign-in.facade";
import { SignInEffects } from "../sign-in/sign-in.effects";

describe('SignInFacade', () => {
  let facade: SignInFacade;
  let form: FormGroup;
  let api: SignInApi

  const token = {
    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh_token: '',
    token_type: 'JWT',
    expires_in: 1516239022
  };

  beforeEach(() => {
    form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      remember: new FormControl(true)
    })

    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('sign-in', signInPageReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SignInEffects])
      ],
      providers: [SignInApi, SignInFacade,
        TokenService, CookiesService, SignInEffects]
    });

    facade = TestBed.get(SignInFacade);
    api = TestBed.get(SignInApi);
  });

  describe('tryingToSignIn$', () => {
    it('when form is submited and is valid tryingToSignIn$ should emit true value', () => {

      let flag: boolean = undefined;

      form.get('password').setValue('password');
      form.get('email').setValue('email');

      form.updateValueAndValidity();

      facade.submitForm(form);

      spyOn(api, 'signIn').and.returnValue(of(token));

      const subscription = facade.tryingToSignIn$
        .pipe(
          take(1)
        ).subscribe(v => flag = v);

      expect(flag).toBeTruthy();

      subscription.unsubscribe();

    });

    it('when form is submited and is valid tryingToSignIn$ should emit two values true and then false', () => {

      form.get('password').setValue('password');
      form.get('email').setValue('email');

      form.updateValueAndValidity();

      facade.submitForm(form);

      let trueFlag: boolean = undefined;
      let falseFlag: boolean = undefined;

      facade.tryingToSignIn$
        .pipe(
          filter(f => f === true),
          take(1)
        ).subscribe(v => trueFlag = v);

      facade.tryingToSignIn$
        .pipe(
          filter(f => f === false),
          take(1)
        ).subscribe(v => falseFlag = v);

      expect(trueFlag).toBeTruthy();
      expect(falseFlag).toBeFalsy();
    });
  });

  describe('signInForm$', () => {
    it('should initially be not valid and have password and email controls', () => {

      let formFromFacade: FormGroup = undefined;

      const subscription = facade.signInForm$
        .pipe(
          take(1)
        ).subscribe(v => formFromFacade = v);

      expect(formFromFacade.valid).toBeFalsy();
      expect(formFromFacade.get('email')).toBeDefined();
      expect(formFromFacade.get('password')).toBeDefined();

      subscription.unsubscribe();
    });

    it('should be valid when password and email is provided', () => {

      let formFromFacade: FormGroup;

      form.get('email').setValue('email');
      form.get('password').setValue('password');

      form.updateValueAndValidity();

      facade.submitForm(form);

      const subscription = facade.signInForm$
        .pipe(
          take(1)
        ).subscribe(v => formFromFacade = v);

      expect(formFromFacade.valid).toBeTruthy();

      subscription.unsubscribe();
    })
  });

  describe('submitForm', () => {
    it('should submit form with password and email', () => {

      form.get('email').setValue('email');
      form.get('password').setValue('password');

      form.updateValueAndValidity();

      facade.submitForm(form);

      expect().nothing();
    });
  });

  describe('credentials$', () => {
    it('should give credentials based on submited form', () => {
      let credentials: Credentials;

      form.get('email').setValue('email');
      form.get('password').setValue('password');

      form.updateValueAndValidity();

      facade.submitForm(form);

      facade.credentials$
        .pipe(
          take(1)
        ).subscribe(v => credentials = v);

      expect(credentials.email).toBe('email');
      expect(credentials.password).toBe('password');
    })
  })
})
