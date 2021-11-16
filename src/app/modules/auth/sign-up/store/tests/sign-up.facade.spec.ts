import { HttpClientModule } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"
import { take } from "rxjs/operators"
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api"
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter"
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service"
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade"
import { CommonValidators } from "src/app/modules/shared/common/validators"
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade"
import { signUpStateReducer } from ".."
import { SignUpEffects } from "../sign-up.effects"
import { SignUpFacade } from "../sign-up.facade"

describe('sign up facade', () => {
  let facade: SignUpFacade
  let api: SignUpApi;

  let form: FormGroup = undefined;

  beforeEach(() => {
    form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3),
      CommonValidators.cannotContainSpace], []),
      email: new FormControl('', [Validators.required, Validators.email], []),
      password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
      repeatPassword: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
      newsletter: new FormControl(false),
    }, { validators: [CommonValidators.passwordMatcher('password', 'repeatPassword')] })

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('sign-up', signUpStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SignUpEffects])
      ],
      providers: [SignUpFacade,
        ErrorsFacade,
        SignUpApi, ErrorActions, MesssagesFacade, ApiErrorAdapter]
    });

    facade = TestBed.get(SignUpFacade);
    api = TestBed.get(SignUpApi);
  });

  describe('signUpForm$', () => {
    it('should return sign up form from observable that is initially invalid', () => {
      let form: FormGroup = undefined;

      facade.initilizeSignUpForm();

      const subscription = facade.signUpForm$
        .pipe(
          take(1)
        ).subscribe(value => {
          form = value
        });

      expect(form).toBeDefined();
      expect(form.valid).toBeFalsy();

      subscription.unsubscribe();
    });

    it('should return sign up form with invalid status when submited form is not valid', () => {

      let formFromFacade: FormGroup;

      facade.initilizeSignUpForm();

      form.get('password').setValue('foo');
      form.updateValueAndValidity();

      facade.submitSignUpForm(form);

      const subscritpion = facade.signUpForm$
        .subscribe(val => formFromFacade = val);

      expect(formFromFacade.valid).toBeFalsy();

      subscritpion.unsubscribe();
    });

    it('should return sign up form with valid status when submited form is ok', () => {

      let formFromFacade: FormGroup;

      facade.submitSignUpForm(new FormGroup({}));

      const subscritpion = facade.signUpForm$.subscribe(val => formFromFacade = val);

      expect(formFromFacade.valid).toBeTruthy();

      subscritpion.unsubscribe();
    })
  })
})
