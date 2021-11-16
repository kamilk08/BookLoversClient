import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-series-item',
  templateUrl: './author-series-item.component.html',
  styleUrls: ['./author-series-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorSeriesItemComponent implements OnInit {

  @Input() seriesId: number

  constructor() { }

  ngOnInit() {
  }
}
