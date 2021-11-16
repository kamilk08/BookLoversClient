import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Shelf } from '../../../models/shelf.model';
import { EditShelfsNameService } from './services/edit-shelfs-name.service';
import { EditShelfDialogResult } from './services/edit-shelf-dialog.result';
import { HostListener } from '@angular/core';

@Component({
  selector: 'edit-shelf',
  templateUrl: './edit-shelf.component.html',
  styleUrls: ['./edit-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditShelfComponent implements OnInit, OnDestroy {

  public shelf: Shelf

  constructor(public readonly pageService: EditShelfsNameService,
    public readonly modal: NzModalRef) { }

  ngOnDestroy(): void {
    this.pageService.editShelfForm.reset();
  }

  ngOnInit() {
  }

  submit() {
    this.submitInternal();
  }

  close() {
    this.closeInternal();
  }

  @HostListener('document:keydown.escape') onEscapePress() {
    this.closeInternal();
  }

  @HostListener('document:keydown.enter') onEnterPress() {
    this.submitInternal();
  }

  private closeInternal() {
    const result: EditShelfDialogResult = {
      confirmed: false,
      shelfName: undefined,
      shelf: this.shelf
    };
    this.pageService.editShelfForm.reset();
    this.modal.destroy(result);
  }

  private submitInternal() {
    if (this.pageService.editShelfForm.valid) {
      const result: EditShelfDialogResult = {
        confirmed: true,
        shelfName: this.pageService.shelfName,
        shelf: this.shelf
      };
      this.modal.close(result);
    }
    else
      this.pageService.updateFormValidity(this.pageService.editShelfForm);
  }


}
