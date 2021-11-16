import { ValidationErrors, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { HAS_UPPERCASE_REGEX, HAS_NUMBER_REGEX } from './regexes';
import * as moment from 'moment';

export class CommonValidators {

  static cannotContainSpace(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value === '') return null;

    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true }
    }

    return null;
  }

  static invalidDate(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value === '')
      return null;

    if (!moment(control.value, 'DD-MM-YYYY').isValid()) {
      return { isDateValid: true }
    }

    return null;
  }

  static hasUpperCase(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value === '')
      return null;

    let hasUpperCaseRegex = new RegExp(HAS_UPPERCASE_REGEX);

    var result = hasUpperCaseRegex.test(control.value);
    return result === true ? null : { hasUpperCase: true };
  }

  static hasNumber(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value === '')
      return null;

    let hasNumberRegex = new RegExp(HAS_NUMBER_REGEX);

    let result = hasNumberRegex.test(control.value);
    return result == true ? null : { hasNumber: true }
  }

  static passwordMatcher(passwordControlName, repeatPasswordControlName): ValidatorFn {
    return (formGroup: FormGroup) => {
      if (formGroup === null)
        return null;

      formGroup.controls[passwordControlName].value !== formGroup.controls[repeatPasswordControlName].value ?
        formGroup.controls[repeatPasswordControlName].setErrors({ passwordMismatch: true }) : null
    }
  }
}
