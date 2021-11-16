import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-basics-item',
  templateUrl: './book-basics-item.component.html',
  styleUrls: ['./book-basics-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookBasicsItemComponent implements OnInit {

  @Input() text: string
  @Input() value: string

  constructor() { }

  ngOnInit() {
  }

}
