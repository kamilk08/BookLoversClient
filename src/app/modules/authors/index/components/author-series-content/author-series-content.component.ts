import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Statistics } from 'src/app/modules/api/ratings/statistics/models/statistics';
import { Series } from 'src/app/modules/api/series/models/series.model';

@Component({
  selector: 'author-series-content',
  templateUrl: './author-series-content.component.html',
  styleUrls: ['./author-series-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorSeriesContentComponent implements OnInit {

  @Input() bookSeries: Series;
  @Input() seriesStatistics: Statistics;

  constructor() { }

  ngOnInit() {
  }

}
