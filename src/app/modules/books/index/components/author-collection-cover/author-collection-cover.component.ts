import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'author-collection-cover',
  templateUrl: './author-collection-cover.component.html',
  styleUrls: ['./author-collection-cover.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCollectionCoverComponent implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public bookUrl = () => `${environment.upload}/books/${this.bookId}`

  @Input() bookId: number;

  constructor() { }

  ngOnInit() {
  }

  onError(event: Event) {
    this.coverLoadError$.next(true);
  }
}
