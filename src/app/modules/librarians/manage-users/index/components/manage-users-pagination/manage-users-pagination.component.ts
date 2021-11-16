import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'manage-users-pagination',
  templateUrl: './manage-users-pagination.component.html',
  styleUrls: ['./manage-users-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUsersPaginationComponent implements OnInit {
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
