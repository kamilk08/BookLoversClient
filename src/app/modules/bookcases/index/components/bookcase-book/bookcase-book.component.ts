import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bookcase-book',
  templateUrl: './bookcase-book.component.html',
  styleUrls: ['./bookcase-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookcaseBookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
