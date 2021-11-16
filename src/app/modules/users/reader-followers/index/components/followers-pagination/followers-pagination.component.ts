import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'followers-pagination',
  templateUrl: './followers-pagination.component.html',
  styleUrls: ['./followers-pagination.component.scss']
})
export class FollowersPaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() pageSize: number;
  @Input() totalItems: number

  @Output() changePage: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnInit() {
  }

  toNextPage(pageNumber: number) {
    this.changePage.emit({ currentPage: pageNumber, totalItems: this.totalItems });
  }

}
