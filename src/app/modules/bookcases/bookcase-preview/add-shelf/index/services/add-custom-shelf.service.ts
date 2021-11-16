import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageService } from 'src/app/modules/shared/common/page.service';

@Injectable()
export class AddCustomShelfService extends PageService {

  public addShelfForm: FormGroup

  constructor() {
    super();
    this.createAddShelfForm();
  }

  private createAddShelfForm() {
    this.addShelfForm = new FormGroup({
      shelfName: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  get shelfName() {
    return this.addShelfForm.get('shelfName').value;
  }


}
