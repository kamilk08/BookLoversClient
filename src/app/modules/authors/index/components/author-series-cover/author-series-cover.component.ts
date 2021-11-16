import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'author-series-cover',
  templateUrl: './author-series-cover.component.html',
  styleUrls: ['./author-series-cover.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorSeriesCoverComponent implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authorBookCoverUrl = () => `${environment.upload}/books/${this.bookId}`

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

  onLoadError(event: Event) {
    this.coverLoadError$.next(true);
  }
}
