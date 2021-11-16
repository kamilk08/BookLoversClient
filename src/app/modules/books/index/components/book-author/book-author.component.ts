import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAuthorComponent implements OnInit {

  @Input() authorId: number
  @Input() authorName: string

  constructor() { }

  ngOnInit() {
  }

}
