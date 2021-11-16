import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Book } from 'src/app/modules/api/books/models/book.model';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';

@Component({
  selector: 'author-book-content',
  templateUrl: './author-book-content.component.html',
  styleUrls: ['./author-book-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorBookContentComponent implements OnInit {

  @Input() overview: RatingsOverview;
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }
}
