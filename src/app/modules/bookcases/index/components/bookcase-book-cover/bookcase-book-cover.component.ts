import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'bookcase-book-cover',
  templateUrl: './bookcase-book-cover.component.html',
  styleUrls: ['./bookcase-book-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookcaseBookCoverComponent implements OnInit {

  public readonly coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public bookCoverUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number

  constructor() { }

  ngOnInit() {
  }

  onError() {
    this.coverLoadError$.next(true);
  }

}
