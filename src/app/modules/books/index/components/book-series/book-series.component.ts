import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-series',
  templateUrl: './book-series.component.html',
  styleUrls: ['./book-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSeriesComponent implements OnInit {

  public seriesLink = '/series';

  @Input() seriesName: string
  @Input() seriesId: number
  @Input() position: number

  constructor() { }

  ngOnInit() {
  }

}
