import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Book, BookAuthor } from 'src/app/modules/api/books/models';
import { noEmptyArray, noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { Review } from '../../../api/reviews/models/review.model';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { ReviewsPageFacade } from '../store/reviews-page/reviews-page.facade';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { BookcaseFacade } from 'src/app/modules/bookcases/store/bookcases/bookcase.facade';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { ReadersFacade } from '../../readers/store/readers/reader.facade';
import { ReviewsPaginationFacade } from '../store/reviews-pagination.facade';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public readonly pagiantionFacade: ReviewsPaginationFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly booksFacade: BookFacade,
    public readonly readersFacade: ReadersFacade,
    public readonly ratingsOverviewFacade: RatingsOverviewFacade,
    public readonly bookcaseFacade: BookcaseFacade,
    public readonly pageFacade: ReviewsPageFacade) { }


  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        tap((paramMap: ParamMap) => this.pageFacade.setReaderIdOnReviewsPage(+paramMap.get('id'))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.pageFacade.readerId$
      .pipe(
        filter(noNullOrUndefined()),
        switchMap((readerId: number) => this.pagiantionFacade.readerReviewsPageResult$(readerId)),
        filter(noNullOrUndefined()),
        map((result: PageResult) => result.items as Review[]),
        map((reviews: Review[]) => reviews.map(s => s.reviewedBook.bookId)),
        tap((ids: number[]) => this.booksFacade.selectMultipleBooksById(ids)),
        filter(noEmptyArray()),
        tap((ids: number[]) => this.ratingsOverviewFacade.selectMultipleOverviews(ids)),
        switchMap((ids: number[]) => this.booksFacade.multipleBooks$(ids)),
        filter(noEmptyArray()),
        map((books: Book[]) => books.selectMany(s => s.authors)),
        map((authors: BookAuthor[]) => authors.map(s => s.authorId)),
        filter(noNullOrUndefined()),
        tap((ids: number[]) => {
          if (ids.length > 0)
            this.authorsFacade.selectMultipleAuthorsById(ids);
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onPageChange(event: PageChangeEvent) {
    this.pageFacade.nextReviewsPage(event.currentPage - 1);
  }

  public readonly bookFirstAuthor$ = (bookId: number) => this.booksFacade.bookById$(bookId)
    .pipe(
      filter(noNullOrUndefined()),
      map((book: Book) => book.authors[0].authorId),
      switchMap(authorId => this.authorsFacade.authorById$(authorId))
    );

}
