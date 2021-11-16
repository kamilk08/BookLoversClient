import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPublisherNameUnique } from 'src/app/modules/books/common/is-publisher-name-unique.validator';
import { Injectable } from '@angular/core';
import { PageService } from 'src/app/modules/shared/common/page.service';
import { PublisherApi } from 'src/app/modules/api/publishers/publisher.api';

@Injectable()
export class AddPublisherService extends PageService {

  private minPublisherLength: number = 3;

  public addPublisherForm: FormGroup

  constructor(private publisherApi: PublisherApi) {
    super();
    this.createPublisherForm();
  }

  private createPublisherForm() {
    this.addPublisherForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
        [isPublisherNameUnique(this.publisherApi, this.minPublisherLength)])
    })
  }

  get name() {
    return this.addPublisherForm.get('name');
  }
}
