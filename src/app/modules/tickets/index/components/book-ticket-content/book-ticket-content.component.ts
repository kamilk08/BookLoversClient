import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { AddBookPicture } from 'src/app/modules/api/books/add/models/add-book-picture.interface';
import { AddBookModel } from 'src/app/modules/api/books/add/models/add-book.interface';
import { ALL_SUBCATEGORIES } from 'src/app/modules/books/common/categories';
import { BOOK_LANGUAGES } from 'src/app/modules/books/common/languages';
import { SolveTicketChange } from '../author-ticket-content/events/solve-ticket-change';

@Component({
  selector: 'book-ticket-content',
  templateUrl: './book-ticket-content.component.html',
  styleUrls: ['./book-ticket-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class BookTicketContentComponent implements OnInit, OnChanges {

  public encodedImage: string;

  @Input() authors: Author[];
  @Input() content: AddBookModel
  @Input() picture: AddBookPicture;
  @Input() manageable: boolean;

  @Output() solveTicket: EventEmitter<SolveTicketChange> = new EventEmitter<SolveTicketChange>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.picture) {
      this.encodedImage = 'data:image/jpeg;base64,' + this.picture.cover
    }
  }

  approveOrDeclineTicket(flag: boolean) {
    flag ? this.solveTicket.emit({
      approved: true,
      declined: false
    }) : this.solveTicket.emit({
      approved: false,
      declined: true
    });
  }

  getSubCategrory(subCategoryId: number) {
    if (subCategoryId)
      return ALL_SUBCATEGORIES.find(f => f.id === subCategoryId).name
    else return '';
  }

  getLanguage(languageId: number) {
    if (languageId) {
      return BOOK_LANGUAGES.find(f => f.id === languageId).name;
    }
    else return '';
  }

}
