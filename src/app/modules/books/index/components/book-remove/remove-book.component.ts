import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Book } from 'src/app/modules/api/books/models';
import { RemoveBookDialogResult } from './services/remove-book-dialog.result';

@Component({
  selector: 'book-remove',
  templateUrl: './remove-book.component.html',
  styleUrls: ['./remove-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveBookComponent implements OnInit, OnDestroy {

  public dialogResult: RemoveBookDialogResult;

  public book: Book

  constructor(private readonly nzModalRef: NzModalRef) { }

  ngOnDestroy(): void {
    this.dialogResult = undefined;
  }

  ngOnInit() {
  }

  cancel() {
    this.cancelInternal();
  }

  confirm() {
    this.confirmInternal();
  }

  private cancelInternal() {
    this.dialogResult = { confirmed: false, book: this.book }
    this.nzModalRef.destroy(this.dialogResult);
  }

  private confirmInternal() {
    this.dialogResult = { confirmed: true, book: this.book };
    this.nzModalRef.destroy(this.dialogResult);
  }

  @HostListener('document:keydown.escape', []) onEscapePress() {
    this.cancel();
  }

  @HostListener('document.keydown.enter', []) onEnterPress() {
    this.confirm();
  }


}
