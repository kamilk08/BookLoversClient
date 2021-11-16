import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import { ReadersFacade } from "src/app/modules/users/readers/store/readers/reader.facade";

import * as fromActions from '../change-password-form.actions';
import { ChangePasswordFormEffects } from "../change-password-form.effects";

describe('CHANGE_PASSWORD_FORM_EFFECTS', () => {

  let effects: ChangePasswordFormEffects;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  let reader = new Reader(new ReaderDetails('username', 'role', new Date()), 1);
  reader.identification.id = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule
      ],
      providers: [
        ChangePasswordFormEffects,
        AuthService,
        TokenService,
        CookiesService,
        provideMockActions(() => actions$),
        {
          provide: ReadersFacade,
          useValue: {
            reader$: (readerId: number) => of(reader)
          }
        }
      ]
    });

    effects = TestBed.get(ChangePasswordFormEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SUBMIT_CHANGE_PASSWORD_FORM$', () => {

    it('should assign CHANGE_PASSWORD_FORM_VALID when form is valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = createChangePassowrdForm();
        form.get('oldPassword').setValue('oldPassword1');
        form.get('newPassword').setValue('newPassword1');
        form.get('confirmPassword').setValue('newPassword1');
        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_CHANGE_PASSWORD_FORM({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_PASSWORD_FORM_VALID({ payload: { form } });

        expectObservable(effects.submitChangePasswordForm$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign CHANGE_PASSWORD_FORM_INVALID when form is not valid', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = createChangePassowrdForm();

        const action = fromActions.SUBMIT_CHANGE_PASSWORD_FORM({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_PASSWORD_FORM_INVALID();

        expectObservable(effects.submitChangePasswordForm$)
          .toBe('b', { b: completion });
      });

    });

  });

  function createChangePassowrdForm() {
    return new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      { validators: [CommonValidators.passwordMatcher('newPassword', 'confirmPassword')] })
  }


});
