import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Shelf } from 'src/app/modules/bookcases/models';

@Component({
  selector: 'book-in-bookcase-shelf-tag',
  templateUrl: './book-in-bookcase-shelf-tag.component.html',
  styleUrls: ['./book-in-bookcase-shelf-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookInBookcaseShelfTagComponent implements OnInit {

  @Input() shelf: Shelf;

  constructor() { }

  ngOnInit() {
  }

}
