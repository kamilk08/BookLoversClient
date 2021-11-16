import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { delay, filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Book } from "src/app/modules/api/books/models";
import { AuthorFacade } from "src/app/modules/authors/store/authors/author.facade";
import { BookFacade } from "src/app/modules/books/store/book.facade";
import { RatingsOverviewFacade } from "src/app/modules/classification/ratings-overview/store/ratings-overview.facade";
import { SeriesFacade } from "src/app/modules/series/store/series/series.facade";
import { noNullOrUndefined } from "src/app/modules/shared/common/operator-extensions";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE } from "src/app/modules/shared/common/query";
import { ModalService } from "src/app/modules/shared/services/modal.service";
import { BOOKCASE_PAGE_QUERY } from "../../bookcase-pagination/models/bookcase-page.query";
import { BookcasePaginationFacade } from "../../bookcase-pagination/store/bookcase-pagination.facade";
import { AddToReadedShelfComponent } from "../../bookcase-preview/components/add-to-readed-shelf/add-to-readed-shelf.component";
import { RemoveBookcaseBookFacade } from "../../bookcase-preview/remove-book/store/remove-bookcase-book.facade";
import { BookcaseStatisticsFacade } from "../../bookcase-statistics/store/bookcase-statistics.facade";
import { RemoveFromBookcaseComponent } from "../../index/components/remove-from-bookcase/remove-from-bookcase.component";
import { Bookcase } from "../../models";
import { ShelfRecordFacade } from "../../shelf-record/store/shelf-record.facade";
import { BookcaseFacade } from "../bookcases/bookcase.facade";

import * as fromActions from '../page/bookcase-page.actions';
import { BookcasePageFacade } from "./bookcase-page.facade";

@Injectable()
export class BookcasePageEffects {

  constructor(private readonly actions$: Actions,
    private readonly pageFacade: BookcasePageFacade,
    private readonly bookcaseFacade: BookcaseFacade,
    private readonly paginationFacade: BookcasePaginationFacade,
    private readonly shelfRecordsFacade: ShelfRecordFacade,
    private readonly booksFacade: BookFacade,
    private readonly authorsFacade: AuthorFacade,
    private readonly seriesFacade: SeriesFacade,
    private readonly ratingsOverviewFacade: RatingsOverviewFacade,
    private readonly statisticsFacade: BookcaseStatisticsFacade,
    private readonly modalService: ModalService,
    private readonly removeBookFacade: RemoveBookcaseBookFacade
  ) {

  }

  setBookcaseId$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_BOOKCASE_READER_ID),
      map(action => action.payload.readerId),
      tap((readerId) => this.bookcaseFacade.selectUserBookcase(readerId))
    ), { dispatch: false })

  setPageBookcase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_PAGE_BOOKCASE),
      map(action => action.payload.bookcase),
      map((bookcase: Bookcase) => {
        return {
          bookcaseId: bookcase.identification.id,
          booksIds: bookcase.shelfs.selectMany(sm => sm.books).distinct()
        }
      }),
      withLatestFrom(this.pageFacade.descending$, this.pageFacade.currentBookIds$, this.pageFacade.sortType$, this.pageFacade.searchPhrase$, this.pageFacade.selectedShelves$),
      tap((stream) => this.paginationFacade
        .selectBooksPage(stream[0].bookcaseId,
          BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream[1], stream[5].map(s => s.identification.id), undefined, stream[3], stream[4]))),
      tap((stream) => this.shelfRecordsFacade.selectMutlipleShelfRecords(stream[0].booksIds, stream[0].bookcaseId))
    ), { dispatch: false });

  setCurrentBookIds$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_CURRENT_BOOKIDS_ON_BOOKCASE_PAGE),
      tap((action) => this.booksFacade.selectMultipleBooksById(action.payload.bookIds)),
      switchMap((action => this.booksFacade.multipleBooks$(action.payload.bookIds)
        .pipe(
          map(books => { return { books: books, sendHttpRequests: action.payload.sendHttpRequests } })
        ))),
      map((stream) => {
        return {
          authorIds: stream.books.selectMany(sm => sm.authors).map(s => s.authorId).distinct(),
          seriesIds: stream.books.map(s => s.series === undefined ? -1 : s.series.seriesId).filter(s => s !== -1),
          bookIds: stream.books.map(s => s.identification.id),
          sendHttpRequests: stream.sendHttpRequests
        }
      }),
      filter(stream => stream.sendHttpRequests),
      tap(stream => stream.authorIds.length > 0 ? this.authorsFacade.selectMultipleAuthorsById(stream.authorIds) : false),
      tap(stream => stream.seriesIds.length > 0 ? this.seriesFacade.selectMultiple(stream.seriesIds) : false),
      tap(stream => stream.bookIds.length > 0 ? this.ratingsOverviewFacade.selectMultipleOverviews(stream.bookIds) : false),
      tap(stream => stream.bookIds.length > 0 ? stream.bookIds.forEach(id => this.statisticsFacade.selectBookcasesWithBook(id)) : false)
    ), { dispatch: false });


  setSearchPhrase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SEARCH_PHRASE_ON_BOOKCASE_PAGE),
      map(action => action.payload.phrase),
      withLatestFrom(this.pageFacade.currentBookcase$, this.pageFacade.selectedShelves$, this.pageFacade.descending$, this.pageFacade.sortType$),
      map(stream => {
        return {
          bookcaseId: stream[1].identification.id,
          shelfIds: stream[2].map(s => s.identification.id),
          descending: stream[3], sortType: stream[4], phrase: stream[0]
        }
      }),
      tap(stream => this.paginationFacade.selectBooksPage(stream.bookcaseId, BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.shelfIds, [], stream.sortType, stream.phrase)))
    ), { dispatch: false })

  changeBookcaseCollectionPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_BOOKCASE_COLLECTION_PAGE),
      withLatestFrom(this.pageFacade.readerId$, this.pageFacade.currentBookcase$, this.pageFacade.selectedShelves$, this.pageFacade.descending$, this.pageFacade.sortType$),
      map(stream => { return { page: stream[0].payload.page, readerId: stream[1], bookcase: stream[2], selectedShelves: stream[3], descending: stream[4], sortType: stream[5] } }),
      filter(stream => stream.selectedShelves !== undefined),
      tap(stream => this.paginationFacade
        .selectBooksPage(stream.bookcase.identification.id,
          BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, stream.page - 1,
            stream.descending,
            stream.selectedShelves.map(s => s.identification.id), undefined, stream.sortType)))
    ), { dispatch: false });


  openRemoveBookFromBookcaseModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_REMOVE_BOOK_FROM_BOOKCASE_MODAL),
      map(action => action.payload.book),
      switchMap(book => this.openRemoveFromBookcaseModal(book).afterClose),
      filter(noNullOrUndefined()),
      map((stream: any) => stream.confirmed ? fromActions.BOOK_REMOVED_FROM_BOOKCASE_BY_USER({ payload: { book: stream.book } })
        : fromActions.NO_ACTION())
    ));

  bookRemovedFromBookcaseByUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BOOK_REMOVED_FROM_BOOKCASE_BY_USER),
      withLatestFrom(this.pageFacade.currentBookcase$, this.paginationFacade.currentPage$, this.pageFacade.descending$, this.pageFacade.selectedShelves$, this.pageFacade.currentBookIds$, this.pageFacade.sortType$),
      map(stream => { return { bookcase: stream[1], book: stream[0].payload.book, page: stream[2] - 1, descending: stream[3], shelvesIds: stream[4].map(s => s.identification.id), bookIds: stream[5], sortType: stream[6] } }),
      tap(stream => this.removeBookFacade.removeFromBookcase(stream.bookcase, stream.book)),
      delay(500),
      tap(stream => this.paginationFacade.selectBooksPage(stream.bookcase.identification.id, BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, stream.page, stream.descending, stream.shelvesIds, undefined, stream.sortType))),
    ), { dispatch: false });

  openReadedShelfModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_READED_SHELF_MODAL),
      withLatestFrom(this.pageFacade.currentBookcase$),
      map(stream => { return { book: stream[0].payload.book, bookcase: stream[1] } }),
      mergeMap(stream => this.openReadedShelfModal(stream.book, stream.bookcase).afterClose
        .pipe(
          filter(f => f !== undefined),
          map((afterClose) => [afterClose.removedFromCoreShelf, stream.book])
        )),
      filter(noNullOrUndefined()),
      map((stream) => stream[0] ? fromActions.BOOK_REMOVED_FROM_CORE_SHELF() : fromActions.NO_ACTION()),
    ));

  bookRemovedFromCoreShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.BOOK_REMOVED_FROM_CORE_SHELF),
      withLatestFrom(this.pageFacade.currentBookcase$, this.pageFacade.descending$, this.pageFacade.selectedShelves$, this.pageFacade.sortType$, this.pageFacade.currentBookIds$),
      filter(noNullOrUndefined()),
      map(stream => { return { bookcase: stream[1], descending: stream[2], shelfIds: stream[3].map(s => s.identification.id), sortType: stream[4], bookIds: stream[5] } }),
      tap(stream => this.paginationFacade.selectBooksPage(stream.bookcase.identification.id, BOOKCASE_PAGE_QUERY(undefined, undefined, stream.descending, stream.shelfIds, stream.bookIds, stream.sortType))),
    ), { dispatch: false });


  descending$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SORT_ORDER_ON_BOOKCASE_PAGE),
      withLatestFrom(this.pageFacade.sortType$, this.pageFacade.selectedShelves$, this.pageFacade.currentBookIds$, this.pageFacade.descending$,
        this.pageFacade.currentBookcase$, this.pageFacade.searchPhrase$),
      map(stream => {
        return {
          sortType: stream[1], shelvesIds: stream[2].map(s => s.identification.id), bookIds: stream[3],
          descending: stream[4], bookcaseId: stream[5].identification.id, searchPhrase: stream[6], hasNoSearchPhrase: (stream[6] === undefined || stream[6] === '')
        }
      }),
      tap(stream => this.paginationFacade.selectBooksPage(stream.bookcaseId, BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.shelvesIds, stream.hasNoSearchPhrase ? [] : stream.bookIds, stream.sortType)))
    ), { dispatch: false });

  sortType$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SORT_TYPE_ON_BOOKCASE_PAGE),
      withLatestFrom(this.pageFacade.descending$, this.pageFacade.selectedShelves$, this.pageFacade.currentBookIds$,
        this.pageFacade.currentBookcase$, this.pageFacade.searchPhrase$, this.pageFacade.sortType$),
      map(stream => {
        return {
          descending: stream[1], shelvesIds: stream[2].map(s => s.identification.id), bookIds: stream[3],
          bookcaseId: stream[4].identification.id, searchPhrase: stream[5], hasNoSearchPhrase: (stream[5] === undefined || stream[5] === ''),
          sortType: stream[6]
        }
      }),
      tap(stream => this.paginationFacade.selectBooksPage(stream.bookcaseId,
        BOOKCASE_PAGE_QUERY(DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, stream.descending, stream.shelvesIds, stream.hasNoSearchPhrase ? [] : stream.bookIds, stream.sortType)))
    ), { dispatch: false })


  private openRemoveFromBookcaseModal(book: Book) {
    return this.modalService
      .withTitle('Notification')
      .withContent(RemoveFromBookcaseComponent)
      .withWidth('600px')
      .withParams({ book })
      .openModal();
  }

  private openReadedShelfModal(book: Book, bookcase: Bookcase) {
    return this.modalService
      .withTitle(`${book.basics.title} review`)
      .withContent(AddToReadedShelfComponent)
      .withWidth('700px')
      .isCloseable(false)
      .withParams({ userId: bookcase.userId, book: book, bookcase: bookcase })
      .openModal();
  }

}
