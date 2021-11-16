import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'browse-book-cover',
  templateUrl: './browse-book-cover.component.html',
  styleUrls: ['./browse-book-cover.component.scss']
})
export class BrowseBookCoverComponent implements OnInit {

  public readonly coverLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public bookCoverUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number
  @Input() title: string
  @Input() isCoverAdded: boolean;
  @Input() reviewsCount: number;
  @Input() average: number;

  constructor() { }

  ngOnInit() {
  }

  onError() {
    this.coverLoadError$.next(true);
  }

  onLoad() {
    this.coverLoadError$.next(false);
  }

  moveToBook() {

  }
}
