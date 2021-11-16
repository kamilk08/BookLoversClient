import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { SignUpApi } from "src/app/modules/api/auth/sign-up/sign-up.api";
import { SIGN_UP } from "../sign-up.actions";
import { SignUpFacade } from "../sign-up.facade";
import * as fromActions from './sign-up-webpage.actions';

@Injectable()
export class SignUpWebPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: SignUpFacade,
    private readonly api: SignUpApi) { }

  initializeSignUpForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.INITIALIZE_SIGN_UP_FORM),
      switchMap(() => [
        fromActions.SET_EMAIL_UNIQUENESS_ASYNC_VALIDATOR({ payload: { api: this.api } }),
        fromActions.SET_USERNAME_UNIQUENESS_ASYNC_VALIDATOR({ payload: { api: this.api } })
      ])
    ));

  submitSignUpForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_SIGN_UP_FORM),
      map(action => action.payload.form),
      switchMap((form) => [form.valid ? fromActions.SIGN_UP_FORM_VALID() : fromActions.SIGN_UP_FORM_INVALID()])
    ));

  signUpFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SIGN_UP_FORM_VALID),
      withLatestFrom(this.facade.signUpModel$),
      map(stream => stream[1]),
      switchMap((signUpModel) => [SIGN_UP({ payload: { signUpModel: signUpModel } })])
    ));

}
