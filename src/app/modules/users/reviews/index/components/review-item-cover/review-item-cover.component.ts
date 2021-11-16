import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'review-item-cover',
  templateUrl: './review-item-cover.component.html',
  styleUrls: ['./review-item-cover.component.scss']
})
export class ReviewItemCoverComponent implements OnInit {

  public bookCoverUrl = () => `${environment.upload}/books/${this.bookId}`;

  @Input() bookId: number;

  public imageLoadError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

  onError(event: Event) {
    this.imageLoadError$.next(true);
  }
}
