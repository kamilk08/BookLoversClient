import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'tickets-pagination',
  templateUrl: './tickets-pagination.component.html',
  styleUrls: ['./tickets-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsPaginationComponent implements OnInit {
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
