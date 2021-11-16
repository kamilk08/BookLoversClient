import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isPublisherCycleUnique } from 'src/app/modules/books/common/is-publisher-cycle-name-unique.validator';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PageService } from 'src/app/modules/shared/common/page.service';
import { PublisherCycleApi } from 'src/app/modules/api/cycles/publisher-cycle.api';

@Injectable()
export class AddPublisherCycleService extends PageService {

  private minCycleLength: number = 3;

  public addPublisherCycleForm: FormGroup;

  private searchSubject$ = new BehaviorSubject('');

  constructor(private api: PublisherCycleApi) {
    super();
    this.createForm();
  }

  private createForm() {
    this.addPublisherCycleForm = new FormGroup({
      publisher: new FormControl(null, [Validators.required]),
      cycleName: new FormControl('', [Validators.required, Validators.minLength(this.minCycleLength), Validators.maxLength(255)],
      [isPublisherCycleUnique(this.api)])
    })
  }

  get cycleName() {
    return this.addPublisherCycleForm.get('cycleName');
  }

  get publisher() {
    return this.addPublisherCycleForm.get('publisher');
  }

  get searchChanges$() {
    return this.searchSubject$;
  }
}
