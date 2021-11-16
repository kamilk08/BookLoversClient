import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'author-series-pagination',
  templateUrl: './author-series-pagination.component.html',
  styleUrls: ['./author-series-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorSeriesPaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalItems: number
  @Input() pageSize: number

  @Output() pageChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnInit() {
  }

  toNextPage(pageNumber: number) {
    this.pageChange.emit({ currentPage: pageNumber, totalItems: this.totalItems })
  }
}
