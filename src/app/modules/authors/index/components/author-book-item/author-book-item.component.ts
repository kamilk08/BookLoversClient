import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-book-item',
  templateUrl: './author-book-item.component.html',
  styleUrls: ['./author-book-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorBookItemComponent implements OnInit {

  @Input() bookId: number

  constructor() { }

  ngOnInit() {
  }

}
