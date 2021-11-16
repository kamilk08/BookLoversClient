import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Shelf } from '../../../models/shelf.model';
import { NzModalRef } from 'ng-zorro-antd';
import { Book } from 'src/app/modules/api/books/models';
import { ChangeShelfDialogResult } from './events/change-shelf-dialog.result';

@Component({
  selector: 'app-change-shelf',
  templateUrl: './change-shelf.component.html',
  styleUrls: ['./change-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeShelfComponent implements OnInit {

  public oldShelf: Shelf;
  public newShelf: Shelf;
  public book: Book

  constructor(public modal: NzModalRef) { }

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
    const result: ChangeShelfDialogResult = {
      confirmed: false,
      oldShelf: this.oldShelf,
      newShelf: this.newShelf,
      book: this.book
    };
    this.modal.close(result);
  }

  private submitInternal() {
    const result: ChangeShelfDialogResult = {
      confirmed: true,
      oldShelf: this.oldShelf,
      newShelf: this.newShelf,
      book: this.book
    };

    this.modal.close(result);
  }
}
