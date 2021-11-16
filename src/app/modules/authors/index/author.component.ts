import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap, map, filter, distinctUntilChanged, takeUntil, switchMap, withLatestFrom, delay } from 'rxjs/operators';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { combineLatest, Subject } from 'rxjs';
import { Author } from '../../api/authors/authors/models/author.model';
import { noEmptyArray, noNullOrUndefined } from '../../shared/common/operator-extensions';
import { Quote } from '../../api/quotes/models/quote.model';
import { Series } from '../../api/series/models/series.model';
import { AuthorWebPageFacade } from '../store/author-web-page/author-web-page.facade';
import { AuthService } from '../../auth/services/auth.service';
import { BookFacade } from '../../books/store/book.facade';
import { BooksPaginationFacade } from '../../books/store/pagination/books-pagination.facade';
import { RatingsOverviewFacade } from '../../classification/ratings-overview/store/ratings-overview.facade';
import { StatisticsFacade } from '../../classification/statistics/store/statistics.facade';
import { QuotesFacade } from '../../quotes/store/quotes/quote.facade';
import { SeriesPaginationFacade } from '../../series/store/series-pagination/series-pagination.facade';
import { SeriesFacade } from '../../series/store/series/series.facade';
import { AuthorFacade } from '../store/authors/author.facade';
import { Book } from '../../api/books/models';
import { INITIAL_PAGE } from '../../shared/common/page-result';
import { QUOTES_PAGE_QUERY } from '../../quotes/models/quotes-page.query';
import { DEFAULT_PAGE } from '../../shared/common/query';
import { AddAuthorQuoteComponent } from './components/add-author-quote/add-author-quote.component';
import { ModalService } from '../../shared/services/modal.service';
import { AddAuthorQuoteChange } from './components/add-author-quote/events/add-author-quote-change.event';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    public readonly pageFacade: AuthorWebPageFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly bookFacade: BookFacade,
    public readonly paginationFacade: BooksPaginationFacade,
    public readonly quotesFacade: QuotesFacade,
    public readonly ratingsOverviewFacade: RatingsOverviewFacade,
    public readonly statisticsFacade: StatisticsFacade,
    public readonly seriesFacade: SeriesFacade,
    public readonly seriesPagination: SeriesPaginationFacade,
    public readonly authService: AuthService,
    public readonly modalService: ModalService,
    public readonly router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        tap((paramMap: ParamMap) => this.pageFacade.setAuthorId(+paramMap.get('id')))
      ).subscribe();

    this.seriesPagination.paginatedSeries$.pipe(
      distinctUntilChanged((x, y) => x === y),
      filter(noNullOrUndefined()),
      map((s: Series[]) => s.map(bs => bs.identification.id)),
      filter(noNullOrUndefined()),
      filter((s: any) => !s.isEmpty()),
      takeUntil(this.unsubscribe$)
    ).subscribe(seriesIds => this.statisticsFacade.selectMultipleSeriesStatistics(seriesIds));

    combineLatest([this.authorsFacade.authorBooksIds$, this.seriesPagination.paginatedSeries$])
      .pipe(
        filter(stream => stream[0] !== undefined),
        map(([bookIds, bookSeries]) => {
          const seriesBookIds = bookSeries.selectMany(sm => sm.books);
          return bookIds.concat(seriesBookIds).distinct();
        }),
        filter(bookIds => !bookIds.isEmpty()),
        takeUntil(this.unsubscribe$)
      ).subscribe(bookIds => this.ratingsOverviewFacade.selectMultipleOverviews(bookIds));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onBooksNextPage(event: PageChangeEvent) {
    this.pageFacade.changeBooksPage(event.currentPage - INITIAL_PAGE);
  }

  onSeriesNextPage(event: PageChangeEvent) {
    this.pageFacade.changeSeriesPage(event.currentPage - INITIAL_PAGE);
  }

  addOrRemoveFollower(author: Author) {
    author.hasFollower(this.authService.userId) ?
      this.authorsFacade.unFollowAuthor(author, this.authService.userId) :
      this.authorsFacade.followAuthor(author, this.authService.userId)
  }

  addOrRemoveQuoteLike(quote: Quote) {
    this.pageFacade.addOrRemoveQuoteLike(quote);
  }

  searchAuthorBooks(phrase: string) {
    this.pageFacade.searchAuthorBooks(phrase);
  }

  addAuthorQuote(author: Author) {
    this.openAddQuoteModal(author)
      .afterClose
      .pipe(
        withLatestFrom(this.pageFacade.authorId$, this.pageFacade.maxBooksCount$),
        map(stream => ({ result: stream[0] as AddAuthorQuoteChange, authorId: stream[1], maxCount: stream[2] })),
        tap(stream => {
          if (stream.result.isConfirmed) {
            this.quotesFacade.addAuthorQuote(stream.result.quote);
          }
        }),
        delay(500),
        tap(stream => {
          this.quotesFacade.selectAuthorQuotes(stream.authorId, QUOTES_PAGE_QUERY(stream.maxCount, DEFAULT_PAGE))
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe()
  }

  editAuthor(author: Author) {
    this.pageFacade.openEditAuthorModal(author);
  }

  removeAuthor(author: Author) {
    this.pageFacade.openRemoveAuthorModal(author);
  }

  onQuotesNextPage(event: PageChangeEvent) {
    this.pageFacade.changeQuotesPage(event.currentPage - INITIAL_PAGE);
  }

  public readonly authorBooks$ = this.authorsFacade.authorBooksIds$
    .pipe(
      filter(noNullOrUndefined()),
      filter(noEmptyArray()),
      // filter((ids: number[]) => ids.length > 0),
      tap((ids: number[]) => this.bookFacade.selectMultipleBooksById(ids)),
      switchMap((ids: number[]) => this.bookFacade.multipleBooks$(ids)),
      filter(noNullOrUndefined()),
      filter((books: Book[]) => books.some(a => a !== undefined)),
      takeUntil(this.unsubscribe$)
    );

  private openAddQuoteModal(author: Author) {
    return this.modalService
      .withTitle('Add author quote')
      .withContent(AddAuthorQuoteComponent)
      .withParams({ author: author })
      .isCloseable(false)
      .canBeClosedByEscapeButton(false)
      .withWidth('37.5rem')
      .openModal();
  }

}

