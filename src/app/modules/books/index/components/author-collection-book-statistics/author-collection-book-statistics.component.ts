import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-collection-book-statistics',
  templateUrl: './author-collection-book-statistics.component.html',
  styleUrls: ['./author-collection-book-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCollectionBookStatisticsComponent implements OnInit {

  @Input() average: number;
  @Input() ratingsCount:number;

  constructor() { }

  ngOnInit() {
  }

}
