import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Book } from 'src/app/modules/api/books/models/book.model';

@Component({
  selector: 'app-remove-from-bookcase',
  templateUrl: './remove-from-bookcase.component.html',
  styleUrls: ['./remove-from-bookcase.component.scss']
})
export class RemoveFromBookcaseComponent implements OnInit {

  public book: Book

  constructor(private modalRef: NzModalRef) { }

  ngOnInit() {
  }

  cancel() {
    this.modalRef.close({ confirmed: false, book: this.book });
  }

  remove() {
    this.modalRef.close({ confirmed: true, book: this.book });
  }
}
