import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { ToggleSearch } from './events/toggle-search.event';
import { SortTypeChange } from './events/sort-type-change';
import { SortOrderChange } from './events/sort-order-change';
import { SORT_BOOKCASE_BY_BOOK_AVERAGE, SORT_BOOKCASE_BY_DATE } from '../../../models/bookcase-sort-type';
import { SortType } from 'src/app/modules/shared/common/sort-type';

@Component({
  selector: 'bookcase-sorting',
  templateUrl: './bookcase-sorting.component.html',
  styleUrls: ['./bookcase-sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookcaseSortingComponent implements OnInit {

  public descending: boolean = true;
  public showSearch: boolean;

  public sortByDate: SortType = SORT_BOOKCASE_BY_DATE;
  public sortByAverage: SortType = SORT_BOOKCASE_BY_BOOK_AVERAGE;

  public sortOrderNames = {
    'SORT_BY_DATE': 'Date',
    'SORT_BY_AVERAGE': 'Average'
  };

  constructor() { }

  @Input() sortNameText: string

  @Output() toggleSearch: EventEmitter<ToggleSearch> = new EventEmitter<ToggleSearch>();
  @Output() sortTypeChange: EventEmitter<SortTypeChange> = new EventEmitter<SortTypeChange>();
  @Output() sortOrderChange: EventEmitter<SortOrderChange> = new EventEmitter<SortOrderChange>();
  @Output() openBookcaseSettings: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
  }

  selectSortType(sortType: SortType) {
    this.sortTypeChange.emit({ sortType });
  }

  toggleSearchBar() {
    this.showSearch = !this.showSearch;
    this.toggleSearch.emit({ showSearch: this.showSearch });
  }

  selectSortOrder(event: boolean) {
    this.sortOrderChange.emit({ descending: event })
  }

  openSettings() {
    this.openBookcaseSettings.emit();
  }
}
