import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
  selector: 'book-ratings-circle',
  templateUrl: './book-ratings-circle.component.html',
  styleUrls: ['./book-ratings-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookRatingsCircleComponent implements OnInit, OnChanges, OnDestroy {

  private numberOfStars = 5;

  public barColor = { '0%': '#7B60EA', '100%': '#7B60EA' };
  public percents: number

  @Input() average: number

  constructor() { }


  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.percents = 0;
    if (this.average) {
      this.toPercents()
    }
  }

  format = (number: number) => `${number}`;

  toPercents() {
    if (this.average)
      this.percents = (this.average * 100) / this.numberOfStars; // 5 - number of avaliable stars;
  }

  ngOnDestroy(): void {
    this.average = undefined;
    this.percents = undefined;
  }
}
