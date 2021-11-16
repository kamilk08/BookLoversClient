import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-on-shelf',
  templateUrl: './book-on-shelf.component.html',
  styleUrls: ['./book-on-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookOnShelfComponent implements OnInit {

  @Input() shelfName: string
  @Input() count: string

  constructor() { }

  ngOnInit() {
  }

}
