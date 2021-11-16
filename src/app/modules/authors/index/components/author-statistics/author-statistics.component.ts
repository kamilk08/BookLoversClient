import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-statistics',
  templateUrl: './author-statistics.component.html',
  styleUrls: ['./author-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorStatisticsComponent implements OnInit {

  @Input() booksCount: number;
  @Input() followersCount: number;
  @Input() booksAverage: number;

  constructor() { }

  ngOnInit() {
  }

}
