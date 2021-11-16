import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bookcase-shelves',
  templateUrl: './bookcase-shelves.component.html',
  styleUrls: ['./bookcase-shelves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookcaseShelvesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
