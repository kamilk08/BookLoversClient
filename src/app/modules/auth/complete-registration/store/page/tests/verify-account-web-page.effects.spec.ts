import { TestBed } from "@angular/core/testing";
import { VerifyAccountWebPageEffects } from "../verify-account-web-page.effects";
import * as fromActions from '../verify-account-web-page.actions';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { TestScheduler } from 'rxjs/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from "@ngrx/store/testing";
import { VerifyAccountFacade } from "../../verify-account/verify-account.facade";
import { VERIFY_ACCOUNT } from "../../verify-account/verify-account.actions";
import { VerifyAccount } from "src/app/modules/api/auth/complete-registration/models/account-verification.model";
import { VerifyAccountModuleState } from "../..";
import { SHOW_FALIURE_MESSAGE } from "src/app/modules/shared/store/messages/actions";

describe('Verify account web page effects', () => {
  let scheduler: TestScheduler;
  let actions$ = new Observable<Action>();
  let facade: VerifyAccountFacade;
  let effects: VerifyAccountWebPageEffects;

  beforeEach(() => {
    const form = new FormGroup({
      token: new FormControl('', []),
      email: new FormControl('', []),
    });
    form.get('token').patchValue('foo');
    form.get('email').patchValue('bar');

    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        provideMockStore<VerifyAccountModuleState>({}),
        VerifyAccountWebPageEffects,
        provideMockActions(() => actions$),
        {
          provide: VerifyAccountFacade,
          useValue: {
            verifyAccountForm$: of(form)
          }
        }
      ]
    })
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    effects = TestBed.get(VerifyAccountWebPageEffects);
  });

  describe('SUBMIT_VERIFY_ACCOUNT_FORM$', () => {
    describe('When dispatched form is valid', () => {
      it('should dispatch VERIFY ACCOUNT FORM VALID action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {

          const form = new FormGroup({
            token: new FormControl('', []),
            email: new FormControl('', []),
          });
          form.get('token').patchValue('foo');
          form.get('email').patchValue('bar');

          const action = fromActions.SUBMIT_VERIFY_ACCOUNT_FORM({ payload: { form } });
          const completion = fromActions.VERIFY_ACCOUNT_FORM_VALID();

          actions$ = hot('a', { a: action });

          const expected$ = 'z';

          expectObservable(effects.submitVerifyAccountForm$)
            .toBe(expected$, {
              z: completion
            });
        })
      })
    });

    describe('When dispatched action and dispatched form is invalid', () => {
      it('should dispatch action VERIFY ACCOUNT FORM INVALID', () => {

        scheduler.run(({ hot, cold, expectObservable }) => {

          const form = new FormGroup({
            token: new FormControl(undefined, [Validators.required]),
            email: new FormControl(undefined, [Validators.required]),
          });

          const action = fromActions.SUBMIT_VERIFY_ACCOUNT_FORM({ payload: { form } });
          const completion = fromActions.VERIFY_ACCOUNT_FORM_INVALID();

          actions$ = cold('a', { a: action });

          const expected$ = 'z';

          expectObservable(effects.submitVerifyAccountForm$)
            .toBe(expected$, {
              z: completion
            });
        })
      })
    });

  });

  describe('ACCOUNT_FORM_VALID$', () => {
    it('when dispatched and form is valid should dispatch VERIFY_ACCOUNT action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.VERIFY_ACCOUNT_FORM_VALID();
        const completion = VERIFY_ACCOUNT({ payload: { model: new VerifyAccount('bar', 'foo') } })

        actions$ = hot('a', { a: action });

        expectObservable(effects.accountFormValid$)
          .toBe('b', { b: completion });
      })
    })
  })

  describe('SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE$', () => {
    it('when dispatched should dispatch another action of type SHOW_FALIURE_MESSAGE', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE({ payload: { error: new Error() } });
        const completion = SHOW_FALIURE_MESSAGE({ payload: { message: 'Something went wrong' } });

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitVerifyAccountFormFaliure$)
          .toBe('b', { b: completion });
      })
    })
  })
})

