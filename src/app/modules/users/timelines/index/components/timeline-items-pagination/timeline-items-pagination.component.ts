import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'timeline-items-pagination',
  templateUrl: './timeline-items-pagination.component.html',
  styleUrls: ['./timeline-items-pagination.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TimeLineItemsPaginationComponent implements OnInit {

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
