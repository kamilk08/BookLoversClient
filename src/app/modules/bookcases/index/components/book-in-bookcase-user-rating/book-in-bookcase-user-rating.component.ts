import { Component, OnInit, Input } from '@angular/core';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';

@Component({
  selector: 'book-in-bookcase-user-rating',
  templateUrl: './book-in-bookcase-user-rating.component.html',
  styleUrls: ['./book-in-bookcase-user-rating.component.scss']
})
export class BookInBookcaseUserRatingComponent implements OnInit {

  @Input() rating: Rating;

  constructor() { }

  ngOnInit() {
  }

}
