import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'author-genres',
  templateUrl: './author-genres.component.html',
  styleUrls: ['./author-genres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorGenresComponent implements OnInit {

  @Input() genres: string[];

  constructor() { }

  ngOnInit() {
  }

}
