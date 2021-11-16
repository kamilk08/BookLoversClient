import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { Shelf } from 'src/app/modules/bookcases/models';
import { Book } from 'src/app/modules/api/books/models';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { Review } from '../../../../../api/reviews/models/review.model';

@Component({
  selector: 'review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {

  @Input() review: Review;
  @Input() book: Book;
  @Input() author: Author;
  @Input() reader: Reader;
  @Input() rating: Rating;
  @Input() shelves: Shelf[];

  constructor() { }

  ngOnInit() {
  }

}
