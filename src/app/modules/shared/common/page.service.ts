import { FormGroup } from '@angular/forms';

export abstract class PageService {

  updateFormValidity(form: FormGroup) {
    for (const key in form.controls) {
      form.controls[key].markAsDirty();
      form.controls[key].updateValueAndValidity();
    }
  }
}

