import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'quotes-pagination',
  templateUrl: './quotes-pagination.component.html',
  styleUrls: ['./quotes-pagination.component.scss']
})
export class QuotesPaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalItems: number
  @Input() pageSize: number

  @Output() pageChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnInit() {
  }


  toNextPage(number: number) {
    this.pageChange.emit({ currentPage: number, totalItems: this.totalItems });
  }

}
