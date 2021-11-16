import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'publisher-page-cover',
  templateUrl: './publisher-page-cover.component.html',
  styleUrls: ['./publisher-page-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherPageCoverComponent implements OnInit {

  public coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authorBookUrl = () => `${environment.api}/books/${this.bookId}`;

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
