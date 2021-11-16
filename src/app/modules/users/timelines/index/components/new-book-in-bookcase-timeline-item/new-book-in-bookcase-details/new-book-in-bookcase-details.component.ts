import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Book } from 'src/app/modules/api/books/models';
import { Series } from 'src/app/modules/api/series/models/series.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { Shelf } from 'src/app/modules/bookcases/models';
import { TimelineItemDetailsService } from '../../../services/timeline-item-details.service';
import { Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';

@Component({
  selector: 'new-book-in-bookcase-details',
  templateUrl: './new-book-in-bookcase-details.component.html',
  styleUrls: ['./new-book-in-bookcase-details.component.css'],
  providers:[]
})
export class NewBookInBookcaseDetailsComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public isExpanded: boolean;

  public readonly bookUrl = (bookId: number) => `${environment.upload}/books/${bookId}`

  @Input() book: Book;
  @Input() authors: Author[]
  @Input() ratingsOverview: RatingsOverview
  @Input() series: Series
  @Input() shelf: Shelf

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
