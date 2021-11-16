import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-collection-book-stars',
  templateUrl: './author-collection-book-stars.component.html',
  styleUrls: ['./author-collection-book-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCollectionBookStarsComponent implements OnInit {

  @Input() rating: number;

  constructor() { }

  ngOnInit() {
  }

}
