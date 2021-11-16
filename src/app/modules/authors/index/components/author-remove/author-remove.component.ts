import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Author } from '../../../../api/authors/authors/models/author.model';
import { RemoveAuthorDialogResult } from './results/remove-author-dialog.result';

@Component({
  selector: 'author-remove',
  templateUrl: './author-remove.component.html',
  styleUrls: ['./author-remove.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorRemoveComponent implements OnInit, OnDestroy {

  public dialogResult: RemoveAuthorDialogResult;

  public author: Author

  constructor(private nzModalRef: NzModalRef) { }

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
    this.dialogResult = { confirmed: false, author: this.author }
    this.nzModalRef.destroy(this.dialogResult);
  }

  private confirmInternal() {
    this.dialogResult = { confirmed: true, author: this.author };
    this.nzModalRef.destroy(this.dialogResult);
  }

  @HostListener('document:keydown.escape', []) onEscapePress() {
    this.cancel();
  }

  @HostListener('document:keydown.enter', []) onEnterPress() {
    this.confirm();
  }


}
