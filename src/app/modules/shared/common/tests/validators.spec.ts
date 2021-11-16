import { FormControl, FormGroup } from "@angular/forms";
import { CommonValidators } from "../validators";

describe('CUSTOM_VALIDATORS', () => {

  describe('CANNOT_CONTAIN_SPACE', () => {
    it('should return null if input is undefined', () => {

      const control = new FormControl();

      const validationErrors = CommonValidators.cannotContainSpace(control);

      expect(validationErrors).toBeNull();
    });

    it('should return null if input is empty', () => {

      const control = new FormControl('');

      const validationErrors = CommonValidators.cannotContainSpace(control);

      expect(validationErrors).toBeNull();
    });

    it('should return null if input is valid', () => {

      const control = new FormControl('abcd');

      const validationErrors = CommonValidators.cannotContainSpace(control);

      expect(validationErrors).toBeNull();

    })

    it('shold return an validationError when input contain spaces', () => {

      const control = new FormControl('asd    1');

      const validationErrors = CommonValidators.cannotContainSpace(control);

      expect(validationErrors).not.toBeNull();
    })

  });

  describe('INVALID_DATE', () => {

    it('should return null if input is undefined', () => {

      const control = new FormControl();

      const validationErrors = CommonValidators.invalidDate(control);

      expect(validationErrors).toBeNull();
    });

    it('should return null if input is empty', () => {

      const control = new FormControl('');

      const validationErrors = CommonValidators.invalidDate(control);

      expect(validationErrors).toBeNull();
    });

    it('should return null if date is valid', () => {

      const control = new FormControl(new Date('12-12-2014'));

      const validationErrors = CommonValidators.invalidDate(control);

      expect(validationErrors).toBeNull();
    })

    it('should return validationError when date is invalid', () => {

      const control = new FormControl('invalid_date');

      const validationErrors = CommonValidators.invalidDate(control);

      expect(validationErrors).not.toBeNull();

    })


  });

  describe('HAS_UPPER_CASE', () => {
    it('should return null if input is undefined', () => {

      const formControl = new FormControl();

      const validationErrors = CommonValidators.hasUpperCase(formControl);

      expect(validationErrors).toBeNull();
    });

    it('should return null if input is empty', () => {

      const formControl = new FormControl('');

      const validationErrors = CommonValidators.hasUpperCase(formControl);

      expect(validationErrors).toBeNull();

    });

  });

  describe('HAS_NUMBER', () => {
    it('should return null if input is undefined', () => {

      const formControl = new FormControl();

      const validationError = CommonValidators.hasNumber(formControl);

      expect(validationError).toBeNull();

    });

    it('should return null if input is empty', () => {

      const formControl = new FormControl('');

      const validationError = CommonValidators.hasNumber(formControl);

      expect(validationError).toBeNull();
    });

    it('should return validationError when input has number', () => {

      const formControl = new FormControl('123');

      const validationError = CommonValidators.hasNumber(formControl);

      expect(validationError).toBeNull();

    });

  });

  describe('PASSWORD_MATCHER', () => {

    it('should return undefined if there is no input', () => {

      const formGroup = new FormGroup({
        password: new FormControl(),
        repeatPassword: new FormControl()
      });

      const validationError = CommonValidators.passwordMatcher('password', 'repeatPassword')(formGroup);

      expect(validationError).not.toBeDefined();
    });

    it('should return validation error inputs are not the same', () => {

      const formGroup = new FormGroup({
        password: new FormControl('password'),
        repeatPassword: new FormControl('passwordaaaa')
      });

      const validationError = CommonValidators.passwordMatcher('password', 'repeatPassword')(formGroup);

      expect(validationError).not.toBeNull();
    });

    it('should not return validation error when inputs are the same', () => {
      const formGroup = new FormGroup({
        password: new FormControl('password'),
        repeatPassword: new FormControl('password')
      });

      const validationError = CommonValidators.passwordMatcher('password', 'repeatPassword')(formGroup);

      expect(validationError).not.toBeDefined();
    });

  });

});
