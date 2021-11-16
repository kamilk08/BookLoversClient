import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { ChangePassword } from "src/app/modules/api/auth/models/change-password.model";
import { CHANGE_PASSWORD } from "src/app/modules/auth/store/auth-state/change-password/change-password.actions";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import * as fromActions from './change-password-form.actions';
import { ReadersFacade } from "src/app/modules/users/readers/store/readers/reader.facade";
import { AuthService } from "src/app/modules/auth/services/auth.service";

@Injectable()
export class ChangePasswordFormEffects {

  constructor(private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly readersFacade: ReadersFacade,
  ) {

  }

  submitChangePasswordForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_CHANGE_PASSWORD_FORM),
      map(action => action.payload.form),
      switchMap((form) => [form.valid ?
        fromActions.CHANGE_PASSWORD_FORM_VALID({ payload: { form } })
        : fromActions.CHANGE_PASSWORD_FORM_INVALID()])
    ));

  changePasswordFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_PASSWORD_FORM_VALID),
      map(action => action.payload.form),
      withLatestFrom(this.readersFacade.reader$(this.authService.userId)),
      map(stream => ({ form: stream[0], reader: stream[1] })),
      switchMap((stream) => [CHANGE_PASSWORD({ payload: { model: this.getChangePasswordModel(stream.reader, stream.form) } })])
    ));


  private getChangePasswordModel(reader: Reader, form: FormGroup) {
    return new ChangePassword(reader.email, reader.details.userName, form.get('oldPassword').value, form.get('newPassword').value);
  }
}
