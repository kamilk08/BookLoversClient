import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'recently-added-book-info',
  templateUrl: './recently-added-book-info.component.html',
  styleUrls: ['./recently-added-book-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedBookInfoComponent implements OnInit {

  @Input() title: string
  @Input() author: string

  constructor() { }

  ngOnInit() {
  }

}
