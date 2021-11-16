import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'bookcase-pagination',
  templateUrl: './bookcase-pagination.component.html',
  styleUrls: ['./bookcase-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookcasePaginationComponent implements OnInit {

  public readonly pageSize = 10;

  @Input() page: number;
  @Input() totalItems: number;

  @Output() changePage: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnInit() {
  }

  selectPage(event: number) {
    this.changePage.emit({ currentPage: event, totalItems: this.totalItems })
  }
}
