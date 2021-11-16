import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-tag',
  templateUrl: './book-tag.component.html',
  styleUrls: ['./book-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookTagComponent implements OnInit {

  @Input() tagText: string

  constructor() { }

  ngOnInit() {
  }

}
