import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, map, first, filter, takeUntil, withLatestFrom, take, switchMap, delay } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { BookViewService } from './services/book-view.service';
import { Bookcase } from 'src/app/modules/bookcases/models/bookcase.model';
import { UserViewService } from './services/user-view.service';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { ReviewContent } from 'src/app/modules/api/reviews/models/review-content.model';
import { ReviewedBook } from 'src/app/modules/api/reviews/models/reviewed-book.model';
import { ReviewedBy } from 'src/app/modules/api/reviews/models/reviewed-by.model';
import { Author } from 'src/app/modules/api/authors/authors/models/author.model';
import { Book } from '../../api/books/models';
import { Subject } from 'rxjs';
import { noNullOrUndefined } from '../../shared/common/operator-extensions';
import { ModalService } from '../../shared/services/modal.service';
import { STARS_CLEARED } from '../../classification/ratings/common/stars';
import { READED_SHELF } from '../../bookcases/models/shelf-categories';
import { DATE_REVIEWS_QUERY } from '../../users/reviews/models/reviews-by-date.query';
import { Series } from '../../api/series/models/series.model';
import { CommentReport } from './components/book-comment-content/events/comment-reported.event';
import { BookWebPageFacade } from '../store/webpage/book-webpage.facade';
import { CommentsSortOrderChange } from './components/comments-sorting-options/events/comment-sort-order-change.event';
import { CommentsSortTypeChange } from './components/comments-sorting-options/events/comment-sort-type-change.event';
import { RatingsOverview } from '../../api/ratings/models/ratings-overview.model';
import { DEFAULT_PAGE, DEFAULT_QUERY } from '../../shared/common/query';
import { ReviewPostChange } from './components/book-add-comment/services/review-posted.event';
import { RemoveBookDialogResult } from './components/book-remove/services/remove-book-dialog.result';
import { RemoveBookComponent } from './components/book-remove/remove-book.component';
import { AuthService } from '../../auth/services/auth.service';
import { QuoteLikeEvent } from '../../shared/models/quote-like.event';
import { ToggleLike } from './components/book-comment-content/events/toggle-like.event';
import { ToggleSpoiler } from './components/book-comment-content/events/toggle-spoiler.event';
import { AddBookQuoteDialogComponent } from './components';
import { QUOTES_PAGE_QUERY } from '../../quotes/models/quotes-page.query';
import { AddBookToShelfFacade } from '../../bookcases/bookcase-preview/add-book-to-shelf/store/add-book-to-shelf.facade';
import { BookcaseStatisticsFacade } from '../../bookcases/bookcase-statistics/store/bookcase-statistics.facade';
import { BookcaseFacade } from '../../bookcases/store/bookcases/bookcase.facade';
import { ReaderStatisticsFacade } from '../../users/statistics/store/reader-statistics.facade';
import { RatingsOverviewFacade } from '../../classification/ratings-overview/store/ratings-overview.facade';
import { RatingsFacade } from '../../classification/ratings/store/ratings.facade';
import { BookNotFound } from '../models/book-not-found';
import { DEFAULT_DELAY } from '../../shared/common/constants';
import { AddBookQuoteChange } from './components/book-add-quote-dialog/events/add-book-quote-change.event';
import { PageChangeEvent } from '../../shared/common/page-change.event'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  public bookId: number

  constructor(
    public readonly pageFacade: BookWebPageFacade,
    public readonly modalService: ModalService,
    public readonly userViewService: UserViewService,
    public readonly bookViewService: BookViewService,
    public readonly authService: AuthService,
    public readonly router: Router,
    public readonly activatedRoute: ActivatedRoute,
    public readonly bookcaseFacade: BookcaseFacade,
    public readonly readersStatisticsFacade: ReaderStatisticsFacade,
    public readonly addBookFacade: AddBookToShelfFacade,
    public readonly bookcaseStatisticsFacade: BookcaseStatisticsFacade,
    public readonly overviewsFacade: RatingsOverviewFacade,
    public readonly ratingsFacade: RatingsFacade
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      filter(noNullOrUndefined()),
      tap(data => this.bookId = +data.get('id')),
      filter(() => this.bookId !== undefined),
      tap(() => this.pageFacade.setBookId(this.bookId)),
      tap(() => this.bookViewService.bookFacade.selectBook(this.bookId)),
      tap(() => this.bookViewService.publisherFacade.selectPublisherByBookId(this.bookId)),
      tap(() => this.bookViewService.quotesFacade.selectBookQuotes(this.bookId, QUOTES_PAGE_QUERY())),
      tap(() => this.userViewService.reviewsPaginationFacade.selectBookReviews(this.bookId, DATE_REVIEWS_QUERY())),
      tap(() => this.overviewsFacade.selectRatingOverview(this.bookId)),
      tap(() => this.ratingsFacade.selectGroupedRatings(this.bookId)),
      tap(() => this.bookcaseStatisticsFacade.selectShelvesWithBook(this.bookId, DEFAULT_QUERY())),
      map(() => this.authService.isLoggedIn()),
      tap((flag) => flag ? this.bookcaseFacade.selectCurrentUserBookcase() : undefined),
      tap((flag) => flag ? this.userViewService.reviewsFacade.selectReview(this.authService.userId, this.bookId) : undefined),
      takeUntil(this.unsubscribe$),
    ).subscribe();

    this.bookViewService.bookFacade.bookById$(this.bookId)
      .pipe(
        filter(noNullOrUndefined()),
        take(1),
        tap((book: Book) => {
          if (book.hasSeries())
            this.bookViewService.seriesFacade.selectSeriesByBook(book.identification.id);
        }),
        map((book: Book) => book.authors.map(s => s.authorId)),
        tap((ids) => this.bookViewService.authorFacade.selectMultipleAuthorsById(ids)),
        switchMap((authorIds: number[]) => this.bookViewService.authorFacade.multipleAuthors$(authorIds)),
        map((authors: Author[]) => authors.selectMany(sm => sm.books).filter(f => f !== this.bookId).distinct()),
        filter((bookIds: number[]) => bookIds.length > 0),
        tap((bookIds: number[]) => this.overviewsFacade.selectMultipleOverviews(bookIds)),
        first(),
        tap((bookIds: number[]) => this.bookViewService.bookFacade.selectMultipleBooksById(bookIds)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.userViewService.reviewsPaginationFacade.paginatedReviews$
      .pipe(
        filter(noNullOrUndefined()),
        map((reviews: Review[]) => reviews.map(s => s.reviewedBy.userId)),
        tap((userIds: number[]) => userIds.forEach((id) => {
          this.userViewService.readersFacade.selectReader(id);
          this.userViewService.readersStatisticsFacade.selectReaderStatistics(id);
        })),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.bookViewService.seriesFacade.seriesByBookId$(this.bookId)
      .pipe(
        filter(noNullOrUndefined()),
        take(1),
        map((series: Series) => series.books),
        map((ids: number[]) => ids.filter(f => f !== this.bookId).distinct()),
        tap((ids: number[]) => this.bookViewService.bookFacade.selectMultipleBooksById(ids)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();

    this.userViewService.reviewAdded$
      .pipe(
        filter(noNullOrUndefined()),
        withLatestFrom(this.bookcaseFacade.bookcaseByUser$(this.authService.userId),
          this.overviewsFacade.singleOverview$(this.bookId), this.bookViewService.bookFacade.bookById$(this.bookId)),
        map(s => { return { review: s[0].review, stars: s[0].stars, bookcase: s[1], overview: s[2], book: s[3] } }),
        tap(stream => this.addToBookcaseIfNotPresent(stream)),
        delay(DEFAULT_DELAY),
        tap(stream => this.userViewService.reviewsFacade.addReview(stream.review)),
        filter(stream => stream.stars !== null),
        filter(stream => stream.stars !== STARS_CLEARED),
        delay(DEFAULT_DELAY),
        tap(stream => this.addRating(stream.overview, new Rating(stream.book.identification.id, this.authService.userId, stream.stars),
          stream.bookcase.identification.guid)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.userViewService.reviewsFacade.isReviewAddedSuccessfully$
      .pipe(
        filter(noNullOrUndefined()),
        filter(() => this.authService.isLoggedIn()),
        takeUntil(this.unsubscribe$)
      ).subscribe(flag => this.selectReviewsOnNewReview(flag));

      this.bookViewService.bookFacade.error$
      .pipe(
        filter(noNullOrUndefined()),
        filter((error) => error instanceof(BookNotFound)),
        takeUntil(this.unsubscribe$)
      ).subscribe(() => this.router.navigate(['not_found']))
  }

  ngOnDestroy(): void {
    this.bookId = undefined;

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editBook() {
    this.router.navigate([`/book/${this.bookId}/edit`]);
  }

  removeBook(book: Book) {
    this.modalService.withTitle('Remove book')
      .withContent(RemoveBookComponent)
      .isCloseable(true)
      .withParams({ book })
      .openModal()
      .afterClose
      .pipe(
        tap((dialog: RemoveBookDialogResult) => dialog.confirmed ? this.bookViewService.bookFacade.removeBook(book) : false),
        takeUntil(this.unsubscribe$)
      ).subscribe()
  }

  addQuote(bookGuid: UUID, quotesCount: number) {
    this.modalService
      .withTitle('Add quote')
      .withContent(AddBookQuoteDialogComponent)
      .isCloseable(false)
      .canBeClosedByEscapeButton(false)
      .withWidth('37.5rem')
      .withParams({ bookGuid })
      .openModal()
      .afterClose
      .pipe(
        tap((result: AddBookQuoteChange) => {
          if (result.quoteAdded) {
            this.bookViewService.quotesFacade.addBookQuote(result.quote);
          }
        }),
        delay(500),
        tap(stream => {
          this.bookViewService.quotesFacade.selectBookQuotes(this.bookId, QUOTES_PAGE_QUERY(quotesCount, DEFAULT_PAGE));
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();

  }

  public onReviewsNextPage(event: PageChangeEvent) {
    this.pageFacade.changeReviewsPage(event.currentPage - 1);
  }

  public onQuoteLike(event: QuoteLikeEvent, userId: number) {
    event.quote.isLikedBy(userId) ?
      this.bookViewService.quotesFacade.unLikeQuote(event.quote, userId) : this.bookViewService.quotesFacade.likeQuote(event.quote, userId);
  }

  public onReviewPost(event: ReviewPostChange, book: Book) {
    const reviewContent = new ReviewContent(event.review, new Date(), event.spoilerComment);
    const reviewedBook = new ReviewedBook(book.identification.id, book.identification.guid);
    const reviewedBy = new ReviewedBy(this.authService.userId, this.authService.userGuid);

    const review: Review = new Review(reviewContent, reviewedBook, reviewedBy);
    this.userViewService.reviewAdded$.next({ review, stars: event.stars });
  }

  public toggleLikeReview(event: ToggleLike, userId: number) {
    event.liked ? this.userViewService.reviewsFacade.likeReview(event.review, userId)
      : this.userViewService.reviewsFacade.unlikeReview(event.review, userId)
  }

  public toggleSpoilerMark(event: ToggleSpoiler, userId: number) {
    event.spoiler
      ? this.userViewService.reviewsFacade.addSpoilerTag(event.review, userId)
      : this.userViewService.reviewsFacade.removeSpoilerTag(event.review, userId)
  }

  public reportReview(event: CommentReport, userId: number) {
    if (event.review.hasBeenReportedBy(userId) === true) return;
    else this.userViewService.reviewsFacade.reportReview(event.review, userId)
  }

  public changeSortOrder(event: CommentsSortOrderChange) {
    this.pageFacade.changeSortOrder(event.descending);
  }

  public changeSortType(event: CommentsSortTypeChange) {
    this.pageFacade.changeSortType(event.sortType);
  }

  public addRating(overview: RatingsOverview, rating: Rating, bookcaseGuid: UUID) {
    this.overviewsFacade.addRating({ id: overview.book.bookId, guid: overview.book.bookGuid }, rating, bookcaseGuid);
  }

  private addToBookcaseIfNotPresent(stream: { review: any; bookcase: Bookcase; overview: RatingsOverview; book: Book; }) {
    if (!stream.bookcase.hasBook(this.bookId)) {
      const readedShelf = stream.bookcase.getShelfByCategory(READED_SHELF.id);
      this.addBookFacade.addToBookcase(stream.bookcase, readedShelf, stream.book);
    }
  }

  private selectReviewsOnNewReview(flag: any) {
    if (flag) {
      this.userViewService.reviewsPaginationFacade.selectBookReviews(this.bookId, DATE_REVIEWS_QUERY());
    }
  }

}

