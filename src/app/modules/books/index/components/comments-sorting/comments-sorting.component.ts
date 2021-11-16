import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'comments-sorting',
  templateUrl: './comments-sorting.component.html',
  styleUrls: ['./comments-sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsSortingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
