import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Book } from 'src/app/modules/api/books/models';
import { Series } from 'src/app/modules/api/series/models/series.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { TimelineItemDetailsService } from '../../../services/timeline-item-details.service';
import { Review } from 'src/app/modules/api/reviews/models/review.model';

@Component({
  selector: 'book-review-timeline-item-details',
  templateUrl: './book-review-timeline-item-details.component.html',
  styleUrls: ['./book-review-timeline-item-details.component.css'],
  providers: []
})
export class BookReviewTimeLineItemDetailsComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public isExpanded: boolean;

  public readonly bookUrl = (bookId: number) => `${environment.upload}/books/${bookId}`

  @Input() book: Book;
  @Input() authors: Author[]
  @Input() ratingsOverview: RatingsOverview
  @Input() series: Series
  @Input() review: Review

  constructor(private readonly detailsService: TimelineItemDetailsService) { }


  ngOnInit() {
    this.detailsService.isExpanded$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isExpaned => this.isExpanded = isExpaned);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



}
