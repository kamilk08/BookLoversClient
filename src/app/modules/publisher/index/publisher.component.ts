import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Book } from '../../api/books/models';
import { AuthorFacade } from '../../authors/store/authors/author.facade';
import { BookcaseStatisticsFacade } from '../../bookcases/bookcase-statistics/store/bookcase-statistics.facade';
import { BookFacade } from '../../books/store/book.facade';
import { BooksPaginationFacade } from '../../books/store/pagination/books-pagination.facade';
import { RatingsOverviewFacade } from '../../classification/ratings-overview/store/ratings-overview.facade';
import { StatisticsFacade } from '../../classification/statistics/store/statistics.facade';
import { noEmptyArray, noNullOrUndefined } from '../../shared/common/operator-extensions';
import { PageChangeEvent } from '../../shared/common/page-change.event';
import { SearchEvent } from '../../shared/common/search.event';
import { PublisherPageFacade } from '../store/page/publisher-page.facade';
import { PublisherFacade } from '../store/publishers/publisher.facade';
import { PublisherBooksSortOrderChange } from './components/publisher-books-sorting-options/events/publisher-books-sort-order-change.event';
import { PublisherBookSortTypeChange } from './components/publisher-books-sorting-options/events/publisher-books-sort-type-change.event';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public readonly activatedRoute: ActivatedRoute,
    public readonly router: Router,
    public readonly pageFacade: PublisherPageFacade,
    public readonly publisherFacade: PublisherFacade,
    public readonly booksFacade: BookFacade,
    public readonly paginationFacade: BooksPaginationFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly statisticsFacade: StatisticsFacade,
    public readonly ratingsOverviewFacade: RatingsOverviewFacade,
    public readonly bookcaseStatisticsFacade: BookcaseStatisticsFacade
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        filter(f => f !== undefined),
        tap((params) => this.pageFacade.setPublisherId(+params.get('id'))),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();

    this.publisherFacade.publisherBooksIds$
      .pipe(
        filter(noNullOrUndefined()),
        filter(noEmptyArray()),
        // filter((ids: number[]) => ids.length > 0),
        tap(ids => ids.forEach(id => this.bookcaseStatisticsFacade.selectBookcasesWithBook(id))),
        tap(ids => this.ratingsOverviewFacade.selectMultipleOverviews(ids)),
        tap(ids => this.booksFacade.selectMultipleBooksById(ids)),
        switchMap(ids => this.booksFacade.multipleBooks$(ids)),
        filter(noNullOrUndefined()),
        filter((books: Book[]) => books.some(a => a !== undefined)),
        map((books: Book[]) => books.selectMany(sm => sm.authors).map(s => s.authorId).distinct()),
        filter((f: any[]) => f.length !== 0),
        tap((authorIds) => this.authorsFacade.selectMultipleAuthorsById(authorIds)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.pageFacade.reset();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onBookPhraseChange(event: SearchEvent) {
    this.pageFacade.searchPhrase(event.phrase);
  }

  onSortTypeChange(event: PublisherBookSortTypeChange) {
    this.pageFacade.changeSortType(event.sortType);
  }

  onSortOrderChange(event: PublisherBooksSortOrderChange) {
    this.pageFacade.changeOrder(event.descending);
  }

  onBooksPageChange(event: PageChangeEvent) {
    this.pageFacade.changePage(event.currentPage - 1);
  }

  public readonly bookAuthors$ = (book: Book) => this.authorsFacade
    .multipleAuthors$(book.authors.map(s => s.authorId));

  public readonly publisherBooks$ = this.publisherFacade.publisherBooksIds$
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((ids: number[]) => this.booksFacade.multipleBooks$(ids)),
      map(books => books.filter(f => f !== undefined))
    );

  public readonly showSpinner$ = this.publisherFacade.processingPublisherBooks$;
}
