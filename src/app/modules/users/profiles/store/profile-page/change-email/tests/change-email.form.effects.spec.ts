import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { CommonValidators } from "src/app/modules/shared/common/validators";
import { ReadersModuleState, readersStateReducer } from "src/app/modules/users/readers/store";
import { ChangeEmailFormEffects } from "../change-email-form.effects";

import * as fromActions from '../change-email-form.actions';
import { ReadersFacade } from "src/app/modules/users/readers/store/readers/reader.facade";
import { CHANGE_EMAIL } from "src/app/modules/auth/store/auth-state/change-email/change-email.actions";
import { ChangeEmail } from "src/app/modules/api/auth/models/change-email.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";

describe('CHANGE_EMAIL_FORM_EFFECTS', () => {

  let reader = new Reader(new ReaderDetails('username', 'role', new Date()), 1);
  reader.identification.id = 1;

  let readersModuleState: ReadersModuleState = {
    readers: {
      entities: { 1: reader },
      ids: [1],
      processing: false,
      error: undefined
    },
    searchReaders: {
      query: undefined,
      pageResult: undefined,
      processing: false,
      error: undefined
    }
  }

  let effects: ChangeEmailFormEffects;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();
  let authService: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('readers', readersStateReducer, { initialState: readersModuleState }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        AuthService,
        TokenService,
        CookiesService,
        {
          provide: ReadersFacade,
          useValue: {
            reader$: (readerId: number) => of(reader)
          }
        },
        ChangeEmailFormEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ChangeEmailFormEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    authService = TestBed.get(AuthService);

  });

  describe('SUBMIT_FORM_VALID$', () => {
    it('should assign CHANGE_EMAIL_FORM_VALID when form was valid', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = new FormGroup({
          oldEmail: new FormControl('', [Validators.required, Validators.email]),
          newEmail: new FormControl('', [Validators.required, Validators.email], []),
          password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase])
        });
        form.get('oldEmail').setValue('testemail@gmail.com');
        form.get('newEmail').setValue('newemail@gmail.com');
        form.get('password').setValue('Abcd123dasF');
        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_CHANGE_EMAIL_FORM({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_EMAIL_FORM_VALID({ payload: { form } });

        expectObservable(effects.submitFormValid$).toBe('b', { b: completion });
      });
    });

    it('should assign CHANGE_EMAIL_FORM_INVALID when form was not valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = new FormGroup({
          oldEmail: new FormControl('', [Validators.required, Validators.email]),
          newEmail: new FormControl('', [Validators.required, Validators.email], []),
          password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase])
        });

        const action = fromActions.SUBMIT_CHANGE_EMAIL_FORM({ payload: { form } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.CHANGE_EMAIL_FORM_INVALID();

        expectObservable(effects.submitFormValid$).toBe('b', { b: completion });
      })
    });
  });

  describe('CHANGE_EMAIL_FORM_VALID$', () => {
    it('should assign CHANGE_EMAIL action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const form = new FormGroup({
          oldEmail: new FormControl('', [Validators.required, Validators.email]),
          newEmail: new FormControl('', [Validators.required, Validators.email], []),
          password: new FormControl('', [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase])
        });
        form.get('oldEmail').setValue('testemail@gmail.com');
        form.get('newEmail').setValue('newemail@gmail.com');
        form.get('password').setValue('Abcd123dasF');
        form.updateValueAndValidity();

        const action = fromActions.CHANGE_EMAIL_FORM_VALID({ payload: { form } });

        spyOnProperty(authService, 'userId').and.returnValue(reader.identification.id);

        actions$ = hot('a', { a: action });

        const model: ChangeEmail = getChangeEmailModel(reader.details.userName, form);

        const completion = CHANGE_EMAIL({ payload: { model } });

        expectObservable(effects.changeEmailFormValid$)
          .toBe('b', { b: completion });
      });
    });
  });


});
function getChangeEmailModel(username: string, form: FormGroup) {
  return new ChangeEmail(username, form.get('password').value, form.get('newEmail').value, form.get('oldEmail').value);
}
