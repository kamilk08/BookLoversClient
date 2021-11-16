import { Component, HostListener, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Shelf } from '../../../models';
import { RemoveCustomShelfResult } from './results/remove-custom-shelf.result';

@Component({
  selector: 'app-remove-custom-shelf',
  templateUrl: './remove-custom-shelf.component.html',
  styleUrls: ['./remove-custom-shelf.component.scss']
})
export class RemoveCustomShelfComponent implements OnInit {

  public shelf: Shelf

  constructor(private modalRef: NzModalRef) { }

  ngOnInit() {
  }

  ok() {
    this.okInternal();
  }

  cancel() {
    this.internalCancel();
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapePress(event: KeyboardEvent) {
    this.internalCancel();
  }

  @HostListener('document:keydown.enter', ['$event']) onEnterPress(event: KeyboardEvent) {
    this.okInternal();
  }

  private okInternal() {
    const result: RemoveCustomShelfResult = {
      confirmed: true,
      shelf: this.shelf
    };

    this.modalRef.close(result);
  }

  private internalCancel() {
    const result: RemoveCustomShelfResult = {
      confirmed: false,
      shelf: this.shelf
    };

    this.modalRef.close(result);
  }
}
