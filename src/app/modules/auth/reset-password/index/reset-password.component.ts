import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateFormValidity } from 'src/app/modules/shared/common/update-form-validity';
import { CommonValidators } from 'src/app/modules/shared/common/validators';
import { ResetPasswordFacade } from '../store/reset-password.facade';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    token: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required, Validators.minLength(6), CommonValidators.hasNumber, CommonValidators.hasUpperCase]),
    repeatPassword: new FormControl(undefined, [Validators.required])
  }, [CommonValidators.passwordMatcher('password', 'repeatPassword')])

  constructor(private facade: ResetPasswordFacade) { }

  ngOnInit() {
  }

  resetPassword() {
    if (this.form.valid) {
      this.facade.resetPassword(this.form.get('token').value, this.form.get('password').value)
    }
    else updateFormValidity(this.form)
  }

}
