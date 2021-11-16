import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-comment-user-stats',
  templateUrl: './book-comment-user-stats.component.html',
  styleUrls: ['./book-comment-user-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCommentUserStatsComponent implements OnInit {

  @Input() books: number;
  @Input() comments: number

  constructor() { }

  ngOnInit() {
  }

}
