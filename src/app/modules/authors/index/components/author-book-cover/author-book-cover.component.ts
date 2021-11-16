import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'author-book-cover',
  templateUrl: './author-book-cover.component.html',
  styleUrls: ['./author-book-cover.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorBookCoverComponent implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authorBookUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

  onCoverError() {
    this.coverLoadError$.next(true);
  }

}
