import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoverComponent implements OnInit {

  public imageLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public bookCoverUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

  onError(event: Event) {
    this.imageLoadError$.next(true);
  }
}
