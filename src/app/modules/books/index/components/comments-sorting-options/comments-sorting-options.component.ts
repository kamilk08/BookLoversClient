import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommentsSortTypeChange } from './events/comment-sort-type-change.event';
import { CommentsSortOrderChange } from './events/comment-sort-order-change.event';
import { SORT_REVIEWS_BY_DATE, SORT_REVIEWS_BY_LIKES } from 'src/app/modules/users/reviews/models/reviews-sort-type';

@Component({
  selector: 'comments-sorting-options',
  templateUrl: './comments-sorting-options.component.html',
  styleUrls: ['./comments-sorting-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsSortingOptionsComponent implements OnInit {

  @Input() sortNameText: string
  @Input() descending: boolean;

  @Output() sortTypeChange: EventEmitter<CommentsSortTypeChange> = new EventEmitter<CommentsSortTypeChange>();
  @Output() sortOrderChange: EventEmitter<CommentsSortOrderChange> = new EventEmitter<CommentsSortOrderChange>();

  constructor() { }

  ngOnInit() {
  }

  sortByDate() {
    this.sortTypeChange.emit({ sortType: SORT_REVIEWS_BY_DATE });
  }

  sortByLikes() {
    this.sortTypeChange.emit({ sortType: SORT_REVIEWS_BY_LIKES });
  }


  changeSortOrder() {
    this.descending = !this.descending;
    this.sortOrderChange.emit({ descending: this.descending })
  }

  public sortNameOptions = {
    'SORT_BY_DATE': 'Date',
    'SORT_BY_LIKES': 'Likes'
  }

}
