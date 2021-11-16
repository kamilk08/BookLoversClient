import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'reviews-pagination',
  templateUrl: './reviews-pagination.component.html',
  styleUrls: ['./reviews-pagination.component.scss']
})
export class ReviewsPaginationComponent implements OnInit {

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
