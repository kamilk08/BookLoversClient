import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-collection-item',
  templateUrl: './author-collection-item.component.html',
  styleUrls: ['./author-collection-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCollectionItemComponent implements OnInit {

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

}
