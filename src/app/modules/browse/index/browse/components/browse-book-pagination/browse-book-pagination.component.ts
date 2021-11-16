import { AfterViewChecked, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';

@Component({
  selector: 'browse-book-pagination',
  templateUrl: './browse-book-pagination.component.html',
  styleUrls: ['./browse-book-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseBookPaginationComponent implements OnInit {

  public readonly pageSize = 10;

  @Input() page: any;
  @Input() totalItems: number;

  @Output() changePage: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnInit() {

  }

  selectPage(event: number) {
    this.changePage.emit({ currentPage: event, totalItems: this.totalItems })
  }
}
