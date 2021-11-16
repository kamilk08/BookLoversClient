import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RESET_SIGN_IN_FORM, SUBMIT_SIGN_IN_FORM } from './sign-in/sign-in.actions';
import * as fromModule from './index';
import * as fromSelectors from './module.selectors';
import { FormGroup } from '@angular/forms';


@Injectable()
export class SignInFacade {

  public readonly tryingToSignIn$ = this.store.select(fromSelectors.processingSignIn);
  public readonly signInForm$ = this.store.select(fromSelectors.singInForm);
  public readonly credentials$ = this.store.select(fromSelectors.credentials);
  public readonly password$ = this.store.select(fromSelectors.password)

  constructor(private store: Store<fromModule.SignInModuleState>) { }

  public submitForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_SIGN_IN_FORM({ payload: { form } }))
  }

  public resetForm() {
    this.store.dispatch(RESET_SIGN_IN_FORM());
  }


}
