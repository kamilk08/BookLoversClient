import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Series } from 'src/app/modules/api/series/models/series.model';
import { SeriesFacade } from 'src/app/modules/series/store/series/series.facade';
import { AddSeriesService } from './services/add-series.service';

@Component({
  selector: 'app-add-series-modal',
  templateUrl: './add-series-modal.component.html',
  styleUrls: ['./add-series-modal.component.scss']
})
export class AddSeriesModalComponent implements OnInit, OnDestroy {

  constructor(private readonly modalRef: NzModalRef,
    public readonly pageService: AddSeriesService,
    public readonly facade: SeriesFacade
  ) { }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pageService.addSeriesForm.reset();
  }

  submit() {
    if (this.pageService.addSeriesForm.valid) {
      this.facade.addSeries(new Series(this.pageService.name.value));
      this.modalRef.destroy();
    }
    else {
      this.pageService.updateFormValidity(this.pageService.addSeriesForm);
    }
  }

  close() {
    this.modalRef.destroy();
  }
}
