import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { SHOW_FALIURE_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { VerifyAccount } from "../../../../api/auth/complete-registration/models/account-verification.model";
import { VERIFY_ACCOUNT } from "../verify-account/verify-account.actions";
import { VerifyAccountFacade } from "../verify-account/verify-account.facade";
import * as fromActions from './verify-account-web-page.actions';

@Injectable()
export class VerifyAccountWebPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly pageFacade: VerifyAccountFacade) {
  }

  submitVerifyAccountForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_VERIFY_ACCOUNT_FORM),
      switchMap(action => of(action.payload.form.valid)),
      switchMap((flag) => [flag ? fromActions.VERIFY_ACCOUNT_FORM_VALID()
        : fromActions.VERIFY_ACCOUNT_FORM_INVALID()]),
      catchError(error => of(fromActions.SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE({ payload: { error } })))
    ));


  accountFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.VERIFY_ACCOUNT_FORM_VALID),
      withLatestFrom(this.pageFacade.verifyAccountForm$),
      map(stream => stream[1]),
      switchMap((form) => [VERIFY_ACCOUNT({ payload: { model: this.mapToVerifyAccountModel(form) } })]),
      catchError(error => of(fromActions.SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE({ payload: { error } })))
    ));

  submitVerifyAccountFormFaliure$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_VERIFY_ACCOUNT_FORM_FALIURE),
      map(action => action.payload.error),
      switchMap((error) => [SHOW_FALIURE_MESSAGE({ payload: { message: 'Something went wrong' } })])
    ))

  mapToVerifyAccountModel(form: FormGroup) {
    const email = form.get('email').value;
    const token = form.get('token').value;

    return new VerifyAccount(email, token);
  }
}
