import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'recently-added-book',
  templateUrl: './recently-added-book.component.html',
  styleUrls: ['./recently-added-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedBookComponent implements OnInit {

  @Input() bookId: number
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
