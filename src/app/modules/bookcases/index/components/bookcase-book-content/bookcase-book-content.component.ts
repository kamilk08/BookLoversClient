import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { Series } from 'src/app/modules/api/series/models/series.model';
import { Book } from 'src/app/modules/api/books/models/book.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';

@Component({
  selector: 'bookcase-book-content',
  templateUrl: './bookcase-book-content.component.html',
  styleUrls: ['./bookcase-book-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookcaseBookContentComponent implements OnInit {

  @Input() book: Book;
  @Input() authors: Author[];
  @Input() series: Series;
  @Input() bookcasesCount: number;
  @Input() ratingsOverview: RatingsOverview

  constructor() { }

  ngOnInit() {
  }
}
