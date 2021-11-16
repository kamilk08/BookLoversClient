import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { ChangeEmail } from "src/app/modules/api/auth/models/change-email.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CHANGE_EMAIL } from "src/app/modules/auth/store/auth-state/change-email/change-email.actions";
import { ReadersFacade } from "src/app/modules/users/readers/store/readers/reader.facade";
import * as fromActions from './change-email-form.actions';

@Injectable()
export class ChangeEmailFormEffects {

  constructor(private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly readersFacade: ReadersFacade) {

  }

  submitFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_CHANGE_EMAIL_FORM),
      map(action => action.payload.form),
      switchMap((form) => [form.valid ?
        fromActions.CHANGE_EMAIL_FORM_VALID({ payload: { form } })
        : fromActions.CHANGE_EMAIL_FORM_INVALID()])
    ));

  changeEmailFormValid$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_EMAIL_FORM_VALID),
      map(action => action.payload.form),
      withLatestFrom(this.readersFacade.reader$(this.authService.userId)),
      map(stream => ({ form: stream[0], reader: stream[1] })),
      switchMap((stream) => [CHANGE_EMAIL({ payload: { model: this.getChangeEmailModel(stream.reader.details.userName, stream.form) } })])
    ))


  private getChangeEmailModel(username: string, form: FormGroup) {
    return new ChangeEmail(username, form.get('password').value, form.get('newEmail').value, form.get('oldEmail').value);
  }

}
