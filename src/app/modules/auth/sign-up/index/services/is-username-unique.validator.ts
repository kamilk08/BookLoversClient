import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { SignUpApi } from '../../../../api/auth/sign-up/sign-up.api';

export function IsUsernameUnique(authService: SignUpApi): AsyncValidatorFn {
  return (control: AbstractControl) =>
    timer(1500).pipe(switchMap(() => {
      return authService.isUsernameUnique(control.value)
        .pipe(
          map((response) => {
            return response === true ? { usernameNotUnique: true } : null
          }))
    }))

}
