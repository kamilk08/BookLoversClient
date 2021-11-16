import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { withLatestFrom, filter, map, tap, mergeMap, takeUntil, switchMap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase, Shelf } from '../../models';
import { PreviewBookcaseService } from './services/preview-bookcase.service';
import { CUSTOM_SHELF, READED_SHELF } from '../../models/shelf-categories';
import { DATE_REVIEWS_QUERY } from 'src/app/modules/users/reviews/models/reviews-by-date.query';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';

@Component({
  selector: 'preview-bookcase',
  templateUrl: './preview-bookcase.component.html',
  styleUrls: ['./preview-bookcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBookcaseComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Input() book: Book;
  @Input() ratingsOverview: RatingsOverview;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public readonly router: Router,
    public readonly pageService: PreviewBookcaseService,
    public readonly authService: AuthService
  ) {

  }

  ngOnInit() {
    this.pageService.addToShelf$
      .asObservable()
      .pipe(
        filter(noNullOrUndefined()),
        withLatestFrom(this.pageService.previewFacade.loggedInUserBookcase$),
        map(stream => { return { bookcase: stream[1], shelf: stream[0].shelf, book: stream[0].book } }),
        map(stream => { return { ...stream, hasBookOnShelf: stream.bookcase.hasBookOnShelf(stream.shelf.identification.id, stream.book.identification.id) } }),
        filter(f => f.shelf.category === READED_SHELF),
        tap(stream => this.addToReadedShelfOrChangeShelf(stream)),
        switchMap(stream => of(this.pageService.openReadedShelf(stream.book, stream.bookcase, this.authService.userId))),
        switchMap(s => s.afterClose),
        takeUntil(this.unsubscribe$))
      .subscribe();

    this.pageService.addToShelf$
      .asObservable()
      .pipe(
        filter(noNullOrUndefined()),
        withLatestFrom(this.pageService.previewFacade.loggedInUserBookcase$),
        map(stream => { return { bookcase: stream[1], shelf: stream[0].shelf, book: stream[0].book } }),
        map(stream => { return { ...stream, hasBookOnShelf: stream.bookcase.hasBookOnShelf(stream.shelf.identification.id, stream.book.identification.id) } }),
        filter(f => f.shelf.category !== READED_SHELF),
        map(stream => { return { ...stream, readedShelf: this.pageService.getReadedShelf(stream.bookcase) } }),
        map(stream => { return { ...stream, hasBookOnReadedShelf: stream.bookcase.hasBookOnShelf(stream.readedShelf.identification.id, stream.book.identification.id) } }),
        tap(stream => this.addToNotReadedShelfOrChangeShelf(stream)),
        filter(stream => stream.bookcase.hasBookOnShelf(stream.readedShelf.identification.id, stream.book.identification.id)),
        mergeMap(stream => this.pageService.openChangeShelf(stream.readedShelf, stream.shelf, stream.book).afterClose),
        withLatestFrom(this.pageService.previewFacade.loggedInUserBookcase$),
        filter(f => f[0] !== undefined),
        map(stream => { return { bookcase: stream[1], oldShelf: stream[0].oldShelf, newShelf: stream[0].newShelf, book: stream[0].book, confirmed: stream[0].confirmed } }),
        takeUntil(this.unsubscribe$)
      ).subscribe((stream: any) => this.onChangeConfirm(stream));

  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addToShelf(shelf: Shelf) {
    this.pageService.addToShelf$.next({ shelf, book: this.book });
  }

  private addToReadedShelfOrChangeShelf(stream: { hasBookOnShelf: boolean; bookcase: Bookcase; shelf: Shelf; book: Book; }) {
    if (!stream.hasBookOnShelf && !stream.bookcase.hasBook(stream.book.identification.id))
      this.pageService.addBookFacade.addToBookcase(stream.bookcase, stream.shelf, stream.book);

    else if (!stream.hasBookOnShelf && stream.bookcase.hasBook(stream.book.identification.id)) {
      const oldShelf = stream.bookcase.getShelvesWithBook(stream.book.identification.id).filter(f => f.category.id !== CUSTOM_SHELF.id)[0];
      const newShelf = stream.shelf;
      this.pageService.changeShelfFacade.changeShelf(stream.bookcase, { oldShelf, newShelf }, stream.book);
    }
  }

  private addToNotReadedShelfOrChangeShelf(stream: { hasBookOnReadedShelf: boolean; readedShelf: Shelf; hasBookOnShelf: boolean; bookcase: Bookcase; shelf: Shelf; book: Book; }) {

    if (!stream.bookcase.hasBook(stream.book.identification.id))
      this.pageService.addBookFacade.addToBookcase(stream.bookcase, stream.shelf, stream.book);
    else if (stream.bookcase.hasBook(stream.book.identification.id) && !stream.hasBookOnReadedShelf) {
      const oldShelf = stream.bookcase.getShelvesWithBook(stream.book.identification.id).filter(f => f.category.id !== CUSTOM_SHELF.id)[0];
      const newShelf = stream.shelf;
      if (oldShelf.identification.id === newShelf.identification.id) return;

      this.pageService.changeShelfFacade.changeShelf(stream.bookcase, { oldShelf, newShelf }, stream.book);
    }
  }

  private onChangeConfirm(stream: any) {
    if (stream.confirmed) {
      const bookcase: Bookcase = stream.bookcase;
      const oldShelf: Shelf = stream.oldShelf;
      const newShelf: Shelf = stream.newShelf;
      const book: Book = stream.book;

      this.pageService.changeShelfFacade.changeShelf(bookcase, { oldShelf: oldShelf, newShelf: newShelf }, book);
      this.pageService.reviewsPagination.selectBookReviews(book.identification.id, DATE_REVIEWS_QUERY());
    }
  }

}
