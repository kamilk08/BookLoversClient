import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { NewCustomShelfDialogResult } from '../../../bookcase-settings/index/events/custom-shelf-dialog.result';
import { AddCustomShelfService } from './services/add-custom-shelf.service';

@Component({
  selector: 'app-add-custom-shelf',
  templateUrl: './add-custom-shelf.component.html',
  styleUrls: ['./add-custom-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCustomShelfComponent implements OnInit, OnDestroy {

  constructor(public modalRef: NzModalRef,
    public readonly pageService: AddCustomShelfService) { }

  ngOnDestroy(): void {
    this.pageService.addShelfForm.reset();
  }

  ngOnInit() {
  }

  submit() {
    this.submitInternal();
  }

  cancel() {
    this.cancelInternal();
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapePress(event: KeyboardEvent) {
    this.cancelInternal();
  }

  @HostListener('document:keydown.enter', ['$event']) onEnterPress(event: KeyboardEvent) {
    this.submitInternal();
  }

  private cancelInternal() {
    const result: NewCustomShelfDialogResult = {
      confirmed: false,
      shelfName: undefined
    };

    this.pageService.addShelfForm.reset();
    this.modalRef.close(result);
  }

  private submitInternal() {
    if (this.pageService.addShelfForm.valid) {
      const result: NewCustomShelfDialogResult = {
        confirmed: true,
        shelfName: this.pageService.shelfName
      };
      this.modalRef.close(result);
    }
    else {
      this.pageService.updateFormValidity(this.pageService.addShelfForm);
    }
  }


}
