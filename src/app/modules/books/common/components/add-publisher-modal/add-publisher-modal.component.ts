import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddPublisherService } from './services/add-publisher.service';
import { NzModalRef } from 'ng-zorro-antd';
import { PublisherFacade } from 'src/app/modules/publisher/store/publishers/publisher.facade';

@Component({
  selector: 'app-add-publisher-modal',
  templateUrl: './add-publisher-modal.component.html',
  styleUrls: ['./add-publisher-modal.component.scss']
})
export class AddPublisherModalComponent implements OnInit, OnDestroy {

  constructor(
    public readonly pageService: AddPublisherService,
    public readonly facade: PublisherFacade,
    public readonly modal: NzModalRef) { }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.pageService.addPublisherForm.reset();
  }

  submit() {
    if (this.pageService.addPublisherForm.valid) {
      this.facade.addPublisher(this.pageService.name.value);
      this.modal.destroy();
    }
    else {
      this.pageService.updateFormValidity(this.pageService.addPublisherForm);
    }
  }

  close() {
    this.pageService.addPublisherForm.reset();
    this.modal.destroy();
  }

}
