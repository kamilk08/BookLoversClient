import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Event } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'other-series-book',
  templateUrl: './book-other-series-book.component.html',
  styleUrls: ['./book-other-series-book.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookOtherSeriesBookComponent implements OnInit {

  public bookUrl = () => `${environment.upload}/books/${this.bookId}`;

  public loadCoverError$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @Input() cover: Blob;
  @Input() bookId: number;
  @Input() title: string

  constructor() { }

  ngOnInit() {
  }

  onError(event: Event) {
    this.loadCoverError$.next(true);
  }
}
