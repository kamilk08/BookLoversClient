import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'series-page-cover',
  templateUrl: './series-page-cover.component.html',
  styleUrls: ['./series-page-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesPageCoverComponent implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public seriesBookUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

  onCoverError() {
    this.coverLoadError$.next(true);
  }

  onComplete() {
    this.coverLoadError$.next(false);
  }
}
