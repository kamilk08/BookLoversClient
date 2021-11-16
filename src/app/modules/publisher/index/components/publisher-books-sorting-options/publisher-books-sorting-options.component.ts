import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { PublisherBookSortTypeChange } from './events/publisher-books-sort-type-change.event';
import { PublisherBooksSortOrderChange } from './events/publisher-books-sort-order-change.event';
import { SORT_PUBLISHER_BOOKS_BY_AVERAGE, SORT_PUBLISHER_BOOKS_BY_TITLE } from '../../../models/publisher-sort-type';

@Component({
  selector: 'publisher-books-sorting-options',
  templateUrl: './publisher-books-sorting-options.component.html',
  styleUrls: ['./publisher-books-sorting-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherBooksSortingOptionsComponent implements OnInit {

  public sortNameOptions = {
    'SORT_BY_TITLE': 'Title',
    'SORT_BY_AVERAGE': 'Average'
  }

  @Input() sortNameText: string
  @Input() descending: boolean;

  @Output() sortTypeChange: EventEmitter<PublisherBookSortTypeChange> = new EventEmitter<PublisherBookSortTypeChange>();
  @Output() sortOrderChange: EventEmitter<PublisherBooksSortOrderChange> = new EventEmitter<PublisherBooksSortOrderChange>();

  constructor() { }

  ngOnInit() {
  }

  sortByTitle() {
    this.sortTypeChange.emit({ sortType: SORT_PUBLISHER_BOOKS_BY_TITLE });
  }


  sortByAverage() {
    this.sortTypeChange.emit({ sortType: SORT_PUBLISHER_BOOKS_BY_AVERAGE });
  }

  changeSortOrder() {
    this.descending = !this.descending;
    this.sortOrderChange.emit({ descending: this.descending })
  }



}
