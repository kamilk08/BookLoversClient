import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-ratings-bar',
  templateUrl: './book-ratings-bar.component.html',
  styleUrls: ['./book-ratings-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookRatingsBarComponent implements OnInit {

  public barColor = { '0%': '#7B60EA', '100%': '#7B60EA' };

  @Input() rating: number
  @Input() allRatingsCount: number;
  @Input() starRatingsCount: number;

  constructor() { }

  ngOnInit() {

  }

  public format = () => `${this.starRatingsCount}`;

  public getPercents() {
    if (this.allRatingsCount && this.starRatingsCount) {
      return Math.round((100 * this.starRatingsCount) / this.allRatingsCount).toFixed(2);
    }

  }
}
