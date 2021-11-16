import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SeriesApi } from 'src/app/modules/api/series/series.api';
import { isSeriesNameUnique } from 'src/app/modules/books/common/is-series-name-unique.validator';
import { PageService } from 'src/app/modules/shared/common/page.service';

@Injectable()
export class AddSeriesService extends PageService {

  public addSeriesForm: FormGroup;

  private minSeriesLength = 3;
  private maxSeriesLength = 255;

  constructor(private api: SeriesApi) {
    super();
    this.createAddSeriesForm();
  }

  private createAddSeriesForm() {
    this.addSeriesForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(this.minSeriesLength), Validators.maxLength(this.maxSeriesLength)], [isSeriesNameUnique(this.api, this.minSeriesLength)])
    })
  }

  get name() {
    return this.addSeriesForm.get('name');
  }
}
