import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'comments-pagination',
  templateUrl: './comments-pagination.component.html',
  styleUrls: ['./comments-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsPaginationComponent implements OnInit {

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

