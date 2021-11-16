import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../../models';
import { RemoveFromReadedResult } from './events/remove-from-readed.result';

@Component({
  selector: 'app-remove-from-readed-shelf',
  templateUrl: './remove-from-readed-shelf.component.html',
  styleUrls: ['./remove-from-readed-shelf.component.scss']
})
export class RemoveFromReadedShelfComponent implements OnInit {

  public bookcase: Bookcase;
  public shelf: Shelf;
  public book: Book

  constructor(private modalRef: NzModalRef) { }

  ngOnInit() {
  }

  cancel() {
    this.cancelInternal();
  }

  ok() {
    this.okInternal();
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapePress(event: KeyboardEvent) {
    this.cancelInternal();
  }


  @HostListener('document:keydown.enter', ['$event']) onEnterPress(event: KeyboardEvent) {
    this.okInternal();
  }

  private okInternal() {
    const accepted: RemoveFromReadedResult = {
      bookcase: this.bookcase,
      shelf: this.shelf,
      book: this.book,
      accepted: true
    };

    this.modalRef.close(accepted);
  }

  private cancelInternal() {
    const declined: RemoveFromReadedResult = {
      bookcase: this.bookcase,
      shelf: this.shelf,
      book: this.book,
      accepted: false
    };
    this.modalRef.close(declined);
  }
}
