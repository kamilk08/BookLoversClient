import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'comments-sorting-header',
  templateUrl: './comments-sorting-header.component.html',
  styleUrls: ['./comments-sorting-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsSortingHeaderComponent implements OnInit {

  @Input() commentsCount: number

  constructor() { }

  ngOnInit() {
  }

}
