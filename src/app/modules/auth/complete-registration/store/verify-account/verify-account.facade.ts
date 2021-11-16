import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromIndex from '../index';
import * as fromSelectors from '../module.selectors';
import { RESET_VERIFY_ACCOUNT_FORM, SUBMIT_VERIFY_ACCOUNT_FORM } from '../page/verify-account-web-page.actions';
import { FormGroup } from '@angular/forms';


@Injectable()
export class VerifyAccountFacade {

  public readonly verifyAccountForm$ = this.store.select(fromSelectors.verifyAccountForm);
  public readonly email$ = this.store.select(fromSelectors.emailOnVerifyForm);
  public readonly token$ = this.store.select(fromSelectors.tokenOnVerifyForm);

  public readonly tryingToVerify$ = this.store.select(fromSelectors.tryingToVerify);

  constructor(private store: Store<fromIndex.VerifyAccountModuleState>) {
  }

  submitForm(form: FormGroup) {
    this.store.dispatch(SUBMIT_VERIFY_ACCOUNT_FORM({ payload: { form } }))
  }

  resetForm() {
    this.store.dispatch(RESET_VERIFY_ACCOUNT_FORM());
  }
}
