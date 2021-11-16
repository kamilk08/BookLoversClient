import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from './index';
import * as fromSelectors from './module.selectors';
import { FormGroup } from '@angular/forms';
import { INITIALIZE_SIGN_UP_FORM, RESET_SIGN_UP_FORM, SUBMIT_SIGN_UP_FORM } from './sign-up-webpage/sign-up-webpage.actions';

@Injectable()
export class SignUpFacade {

  public readonly tryingToSignUp$ = this.store.select(fromSelectors.tryingToSignUp);

  public readonly signUpForm$ = this.store.select(fromSelectors.signUpForm);
  public readonly signUpModel$ = this.store.select(fromSelectors.signUpModel);

  constructor(private readonly store: Store<fromModule.SignUpModuleState>) { }

  public initilizeSignUpForm() {
    this.store.dispatch(INITIALIZE_SIGN_UP_FORM());
  }

  public submitSignUpForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_SIGN_UP_FORM({ payload: { form } }));
  }

  public resetSubmitForm() {
    this.store.dispatch(RESET_SIGN_UP_FORM());
  }

}
