import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'recently-added-book-cover',
  templateUrl: './recently-added-book-cover.component.html',
  styleUrls: ['./recently-added-book-cover.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedBookCoverComponent implements OnInit {

  public readonly coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Input() bookId: number;

  public coverUrl = () => `${environment.upload}/books/${this.bookId}`;

  constructor() { }

  ngOnInit() {
  }

  onError() {
    this.coverLoadError$.next(true);
  }

}
