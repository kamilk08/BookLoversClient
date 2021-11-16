import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Author } from '../../api/authors/authors/models/author.model';
import { Book } from '../../api/books/models';
import { Series } from '../../api/series/models/series.model';
import { AuthorFacade } from '../../authors/store/authors/author.facade';
import { BookcaseStatisticsFacade } from '../../bookcases/bookcase-statistics/store/bookcase-statistics.facade';
import { SortOrderChange } from '../../bookcases/index/components/bookcase-sorting/events/sort-order-change';
import { SortTypeChange } from '../../bookcases/index/components/bookcase-sorting/events/sort-type-change';
import { BookFacade } from '../../books/store/book.facade';
import { BooksPaginationFacade } from '../../books/store/pagination/books-pagination.facade';
import { RatingsOverviewFacade } from '../../classification/ratings-overview/store/ratings-overview.facade';
import { StatisticsFacade } from '../../classification/statistics/store/statistics.facade';
import { noNullOrUndefined } from '../../shared/common/operator-extensions';
import { PageChangeEvent } from '../../shared/common/page-change.event';
import { DEFAULT_ITEMS_COUNT } from '../../shared/common/query';
import { SearchEvent } from '../../shared/common/search.event';
import { SeriesWebPageFacade } from '../store/page/series-web-page.facade';
import { SeriesFacade } from '../store/series/series.facade';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly activatedRoute: ActivatedRoute,
    public readonly seriesFacade: SeriesFacade,
    public readonly booksFacade: BookFacade,
    public readonly statisticsFacade: StatisticsFacade,
    public readonly overviewsFacade: RatingsOverviewFacade,
    public readonly bookcaseStatisticsFacade: BookcaseStatisticsFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly paginationFacade: BooksPaginationFacade,
    public readonly pageFacade: SeriesWebPageFacade,
    public readonly router: Router
  ) { }

  ngOnInit() {
    this.pageFacade.setBooksCount(DEFAULT_ITEMS_COUNT);

    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        tap((params: ParamMap) => this.pageFacade.setSeriesId(+params.get('id'))),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();

    this.seriesFacade.seriesBooksIds$
      .pipe(
        filter(noNullOrUndefined()),
        filter((ids: number[]) => ids.length > 0),
        tap((ids: number[]) => this.overviewsFacade.selectMultipleOverviews(ids)),
        tap((ids: number[]) => ids.forEach(id => this.bookcaseStatisticsFacade.selectBookcasesWithBook(id))),
        tap((ids: number[]) => this.booksFacade.selectMultipleBooksById(ids)),
        switchMap((ids: number[]) => this.booksFacade.multipleBooks$(ids)),
        filter(noNullOrUndefined()),
        filter((books: Book[]) => books.some(a => a !== undefined)),
        map((books: Book[]) => books.selectMany(sm => sm.authors).map(s => s.authorId).distinct()),
        filter(f => f.length !== 0),
        tap((ids: number[]) => this.authorsFacade.selectMultipleAuthorsById(ids)),
        takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSortTypeChange(event: SortTypeChange) {
    this.pageFacade.changeSortType(event.sortType);
  }

  onSortOrderChange(event: SortOrderChange) {
    this.pageFacade.changeOrder(event.descending);
  }

  onBookPhraseChange(event: SearchEvent) {
    this.pageFacade.setSearchPhrase(event.phrase);
  }

  onBooksPageChange(event: PageChangeEvent) {
    this.pageFacade.changePage(event.currentPage - 1);
  }

  public readonly bookAuthors$ = (book: Book) => this.authorsFacade.multipleAuthors$(book.authors.map(s => s.authorId));

  public readonly seriesAuthor$ = (seriesId: number) => this.seriesFacade.seriesById$(seriesId)
    .pipe(
      filter(noNullOrUndefined()),
      map((series: Series) => series.books),
      filter((ids: number[]) => ids.length > 0),
      switchMap((ids: number[]) => this.booksFacade.bookById$(ids[0])),
      filter(noNullOrUndefined()),
      switchMap((book: Book) => this.authorsFacade.authorById$(book.authors[0].authorId)),
      filter(noNullOrUndefined()),
      map((author: Author) => author)
    );

  public readonly seriesBooks$ = this.seriesFacade.seriesBooksIds$
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((ids: number[]) => this.booksFacade.multipleBooks$(ids)),
      map(books => books.filter(f => f !== undefined))
    );
}
