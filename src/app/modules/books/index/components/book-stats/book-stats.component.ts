import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-stats',
  templateUrl: './book-stats.component.html',
  styleUrls: ['./book-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookStatsComponent implements OnInit {

  @Input() average: number
  @Input() ratingsCount: number

  constructor() { }

  ngOnInit() {
  }

}
