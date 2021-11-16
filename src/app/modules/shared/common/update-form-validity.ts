import { FormGroup } from "@angular/forms";

export function updateFormValidity(form: FormGroup) {
  for (let item in form.controls) {
    form.controls[item].markAsDirty();
    form.controls[item].updateValueAndValidity();
  }
}
