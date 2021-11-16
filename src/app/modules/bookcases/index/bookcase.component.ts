import { Component, OnInit, OnDestroy } from '@angular/core';

import { filter, map, switchMap, withLatestFrom, takeUntil, skip, distinctUntilChanged, tap } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { PhraseChange } from './components/bookcase-search-bar/events/phrase-change.event';
import { Shelf, Bookcase } from '../models';
import { Book } from '../../api/books/models/book.model';
import { ShelfChange } from './events/shelf-change.event';
import { RemoveBookcaseBookFacade } from '../bookcase-preview/remove-book/store/remove-bookcase-book.facade';
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from '../../shared/common/query';
import { BookcasePageFacade } from '../store/page/bookcase-page.facade';
import { noNullOrUndefined } from '../../shared/common/operator-extensions';
import { SortTypeChange } from './components/bookcase-sorting/events/sort-type-change';
import { SortOrderChange } from './components/bookcase-sorting/events/sort-order-change';
import { PreviewBookcaseSettingsComponent } from '../bookcase-settings/index/preview-bookcase-settings.component';
import { ModalService } from '../../shared/services/modal.service';
import { ToggleSearch } from './components/bookcase-sorting/events/toggle-search.event';
import { BookcasePaginationFacade } from '../bookcase-pagination/store/bookcase-pagination.facade';
import { BookFacade } from '../../books/store/book.facade';
import { SeriesFacade } from '../../series/store/series/series.facade';
import { BookcaseFacade } from '../store/bookcases/bookcase.facade';
import { BookcaseStatisticsFacade } from '../bookcase-statistics/store/bookcase-statistics.facade';
import { RatingsOverviewFacade } from '../../classification/ratings-overview/store/ratings-overview.facade';
import { AuthService } from '../../auth/services/auth.service';
import { AuthorFacade } from '../../authors/store/authors/author.facade';
import { ShelfRecordFacade } from '../shelf-record/store/shelf-record.facade';
import { BOOKCASE_PAGE_QUERY } from '../bookcase-pagination/models/bookcase-page.query';
import { CUSTOM_SHELF } from '../models/shelf-categories';
@Component({
  selector: 'app-bookcase',
  templateUrl: './bookcase.component.html',
  styleUrls: ['./bookcase.component.scss']
})
export class BookcaseComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly totalCountWhenShelvesAreNotSelected$: ReplaySubject<number> = new ReplaySubject<number>();
  private readonly totalCountWhenShelvesAreSelected$: ReplaySubject<number> = new ReplaySubject<number>();

  public readonly totalCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public actionIcons = [
    { value: 'book--edit-icon icon ion-md-create' },
    { value: 'book--remove-icon icon ion-md-trash' },
    { value: 'book--reviews-icon icon ion-md-chatboxes ' }
  ];

  constructor(
    public readonly removeBookFacade: RemoveBookcaseBookFacade,
    public readonly paginationFacade: BookcasePaginationFacade,
    public readonly pageFacade: BookcasePageFacade,
    public readonly bookFacade: BookFacade,
    public readonly authorFacade: AuthorFacade,
    public readonly bookcaseFacade: BookcaseFacade,
    public readonly seriesFacade: SeriesFacade,
    public readonly statisticsFacade: BookcaseStatisticsFacade,
    public readonly ratingsOverviewFacade: RatingsOverviewFacade,
    public readonly shelfRecordsFacade: ShelfRecordFacade,
    public readonly authService: AuthService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly router: Router,
    public readonly modalService: ModalService
  ) { }

  ngOnDestroy(): void {
    this.pageFacade.reset();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {

    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        distinctUntilChanged(),
        map((paramMap: ParamMap) => +paramMap.get('id')),
        takeUntil(this.unsubscribe$)
      ).subscribe((readerId) => this.pageFacade.setBookcaseReaderId(readerId));

    this.pageFacade.readerId$
      .pipe(
        filter(noNullOrUndefined()),
        distinctUntilChanged(),
        switchMap((readerId: number) => this.bookcaseFacade.bookcaseByUser$(readerId)),
        filter(noNullOrUndefined()),
        tap((bookcase: Bookcase) => this.pageFacade.setPageBookcase(bookcase)),
        takeUntil(this.unsubscribe$)
      ).subscribe()

    this.paginationFacade.bookcasePage$
      .pipe(
        filter(f => f !== undefined),
        skip(1),
        filter(f => f.pageResult !== undefined),
        filter(f => f.processing !== true),
        distinctUntilChanged(),
        withLatestFrom(this.pageFacade.descending$, this.pageFacade.sortType$, this.pageFacade.readerId$),
        map(stream => { return { bookcasePage: stream[0], descending: stream[1], sortType: stream[2], readerId: stream[3] } }),
        tap((stream) => this.pageFacade.setCurrentBookIds(stream.bookcasePage.ids, true)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.pageFacade.selectedShelves$
      .pipe(
        filter(noNullOrUndefined()),
        map((shelves: Shelf[]) => shelves),
        skip(1),
        distinctUntilChanged(),
        withLatestFrom(this.pageFacade.currentBookcase$, this.pageFacade.descending$, this.pageFacade.sortType$, this.pageFacade.searchPhrase$),
        map(stream => { return { shelves: stream[0], bookcase: stream[1], descending: stream[2], sortType: stream[3], bookIds: stream[0].selectMany(sm => sm.books).distinct(), phrase: stream[4] } }),
        filter(stream => stream.bookcase !== undefined),
        map(stream => { return { bookcaseId: stream.bookcase.identification.id, query: BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.shelves.map(s => s.identification.id), undefined, stream.sortType, stream.phrase) } }),
        takeUntil(this.unsubscribe$)
      ).subscribe(stream => this.paginationFacade.selectBooksPage(stream.bookcaseId, stream.query));

    this.paginationFacade.totalItems$
      .pipe(
        filter(f => f !== undefined),
        withLatestFrom(this.pageFacade.selectedShelves$),
        map(stream => { return { totalCount: stream[0], shelves: stream[1] } }),
        tap(stream => {
          (stream.shelves.length === 0) ?
            this.totalCountWhenShelvesAreNotSelected$.next(stream.totalCount)
            : this.totalCountWhenShelvesAreSelected$.next(stream.totalCount)
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.totalCountWhenShelvesAreNotSelected$
      .pipe(
        withLatestFrom(this.pageFacade.currentBookcase$, this.pageFacade.sortType$),
        map(stream => { return { bookcase: stream[1], totalItems: stream[0] } }),
        map(stream => stream.totalItems - stream.bookcase.shelfs.filter(f => f.category.id === CUSTOM_SHELF.id).selectMany(sm => sm.books).length),
        tap(value => this.totalCount$.next(value)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.totalCountWhenShelvesAreSelected$
      .pipe(
        withLatestFrom(this.pageFacade.selectedShelves$, this.pageFacade.sortType$),
        map(stream => { return { totalCount: stream[0], shelves: stream[1] } }),
        filter(stream => stream.shelves !== undefined),
        map(stream => { return { totalCount: stream.totalCount, shelves: stream.shelves as Shelf[], removeFromTotalCount: stream.shelves.some(s => s.category.id === CUSTOM_SHELF.id) && stream.shelves.some(s => s.category.id < CUSTOM_SHELF.id) } }),
        map(stream => stream.removeFromTotalCount ? stream.totalCount - (stream.shelves.filter(f => f.category.id === CUSTOM_SHELF.id).selectMany(sm => sm.books).length) : stream.totalCount),
        tap(value => this.totalCount$.next(value)),
      ).subscribe();

  }

  onShelfSelect(event: ShelfChange) {
    this.pageFacade.addOrRemoveShelf(event.shelf);
  }

  onPhraseChange(event: PhraseChange) {
    this.pageFacade.setSearchPhrase(event.phrase);
  }

  onChangePage(event: PageChangeEvent) {
    this.pageFacade.changeBookcaseCollectionPage(event.currentPage);
  }

  setSortType(event: SortTypeChange) {
    this.pageFacade.setSortType(event.sortType);
  }

  setSortOrder(event: SortOrderChange) {
    this.pageFacade.setSortOrder(event.descending);
  }

  onSeeReviews(book: Book) {
    this.router.navigateByUrl(`book/${book.identification.id}`);
  }

  onRemoveOpenModal(book: Book) {
    this.pageFacade.openRemoveBookFromBookcaseModal(book);
  }

  onOpenSettings(bookcase: Bookcase) {
    if (bookcase.userId !== this.authService.userId)
      return;

    this.modalService
      .withTitle("User bookcase")
      .withContent(PreviewBookcaseSettingsComponent)
      .withWidth('700px')
      .openModal();
  }

  openReadedShelfModal(book: Book) {
    this.pageFacade.openReadedShelfModal(book);
  }

  toggleSearchBar(event: ToggleSearch) {
    this.pageFacade.toggleSearchBar(event.showSearch);
  }

  public readonly showBookcaseActions = (currentBookcase: Bookcase) =>
    currentBookcase.userId === this.authService.userId && this.authService.isLoggedIn()

  public readonly recentlyAddedBooks$ = (userId?: number) => this.bookcaseFacade.bookcaseByUser$(userId ? userId : this.authService.userId)
    .pipe(
      filter(f => f !== undefined),
      map(bookcase => bookcase.shelfs.map(s => s.identification.id)),
      switchMap((shelfIds: number[]) => this.shelfRecordsFacade.recordsFromShelves$(shelfIds)
        .pipe(
          filter(f => f !== undefined))),
      map(s => s.orderByDescending(p => p.addedAt).map(s => s.bookId).distinct(d => d).take(4)),
    );

  public readonly bookAuthorFullName$ = (bookId: number) => {
    return this.bookFacade.bookById$(bookId)
      .pipe(
        filter(f => f !== undefined),
        switchMap(s => this.authorFacade.authorById$(s.authors[0].authorId).pipe(
          filter(f => f !== undefined),
          map(s => s.basics.fullName.value))));
  }

  public readonly bookAuthors$ = (book: Book) =>
    book === undefined ? undefined : this.authorFacade.multipleAuthors$(book.authors.map(s => s.authorId))
      .pipe(
        filter(f => f !== undefined)
      );

  public readonly shelfRecord$ = (bookId: number, userId?: number) => this.bookcaseFacade.bookcaseByUser$(userId ? userId : this.authService.userId)
    .pipe(
      filter(f => f !== undefined),
      map(bookcase => bookcase.getCoreShelfs().filter(f => f.books.includes(bookId))),
      filter(f => f[0] !== undefined),
      map(shelfs => shelfs[0].identification.id),
      switchMap((shelfId) => this.shelfRecordsFacade.shelfRecord$(shelfId, bookId))
    );


}


