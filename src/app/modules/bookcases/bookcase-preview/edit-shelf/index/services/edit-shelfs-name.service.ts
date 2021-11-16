import { PageService } from 'src/app/modules/shared/common/page.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class EditShelfsNameService extends PageService {

    public editShelfForm: FormGroup

    constructor() {
        super();
        this.createEditShelfForm();
    }

    private createEditShelfForm() {
        this.editShelfForm = new FormGroup({
            shelfName: new FormControl('', [Validators.required, Validators.minLength(3)])
        })
    }

    get shelfName() {
        return this.editShelfForm.get('shelfName').value;
    }

}