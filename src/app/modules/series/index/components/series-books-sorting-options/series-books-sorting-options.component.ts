import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { SORT_SERIES_BOOKS_BY_AVERAGE, SORT_SERIES_BOOKS_BY_POSITION, SORT_SERIES_BOOKS_BY_TITLE } from '../../models/series-sort-type';
import { SeriesBooksSortOrderChange } from './events/series-books-sort-order-change.event';
import { SeriesBookSortTypeChange } from './events/series-books-sort-type-change.event';

@Component({
  selector: 'series-books-sorting-options',
  templateUrl: './series-books-sorting-options.component.html',
  styleUrls: ['./series-books-sorting-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesBooksSortingOptionsComponent implements OnInit {

  @Input() sortNameText: string
  @Input() descending: boolean;

  @Output() sortTypeChange: EventEmitter<SeriesBookSortTypeChange> = new EventEmitter<SeriesBookSortTypeChange>();
  @Output() sortOrderChange: EventEmitter<SeriesBooksSortOrderChange> = new EventEmitter<SeriesBooksSortOrderChange>();

  constructor() { }

  ngOnInit() {
  }

  sortByTitle() {
    this.sortTypeChange.emit({ sortType: SORT_SERIES_BOOKS_BY_TITLE });
  }

  sortByAverage() {
    this.sortTypeChange.emit({ sortType: SORT_SERIES_BOOKS_BY_AVERAGE });
  }

  sortByPosition() {
    this.sortTypeChange.emit({ sortType: SORT_SERIES_BOOKS_BY_POSITION });
  }

  changeSortOrder() {
    this.descending = !this.descending;
    this.sortOrderChange.emit({ descending: this.descending })
  }

  public sortNameOptions = {
    'SORT_BY_TITLE': 'Title',
    'SORT_BY_AVERAGE': 'Average',
    'SORT_BY_POSITION_IN_SERIES': 'Position'
  };

}
