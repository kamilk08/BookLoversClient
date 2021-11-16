import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { NzModalRef } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Book } from 'src/app/modules/api/books/models';
import { BookFacade } from 'src/app/modules/books/store/book.facade';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';
import { FavouritesFacade } from '../../../favourites/store/favourites.facade';
import { FavouriteBook } from '../../../../../api/profiles/favourites/models/favourite-book.model';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-add-favourite-book-modal',
  templateUrl: './add-favourite-book-modal.component.html',
  styleUrls: ['./add-favourite-book-modal.component.scss']
})
export class AddFavouriteBookModalComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  public readonly searchBookControl: FormControl = new FormControl()

  constructor(
    private readonly modalRef: NzModalRef,
    public readonly authService: AuthService,
    public readonly bookFacade: BookFacade,
    public readonly authorsFacade: AuthorFacade,
    public readonly overviewsFacade: RatingsOverviewFacade,
    public readonly pageFacade: ProfileWebPageFacade,
    public readonly favouritesFacade: FavouritesFacade
  ) { }

  ngOnInit() {

    this.bookFacade.filteredBooksByTitle$
      .pipe(
        filter(noNullOrUndefined()),
        filter((books: Book[]) => books.length !== 0),
        tap((books: Book[]) => this.overviewsFacade.selectMultipleOverviews(books.map(s => s.identification.id))),
        tap((books: Book[]) => this.authorsFacade.selectMultipleAuthorsById(books.selectMany(sm => sm.authors).map(s => s.authorId))),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.bookFacade.clearSearchResults();
  }

  onChange(event: any) {
    this.pageFacade.findFavouriteBook(this.searchBookControl.value);
  }

  addFavouriteBook(bookGuid: UUID) {
    this.pageFacade.addProfileBook(bookGuid);
    this.modalRef.close();
  }

  removeFavouriteBook(bookGuid: UUID) {
    this.pageFacade.removeProfileBook(bookGuid);
    this.modalRef.close();
  }

  public readonly hasFavouriteBook$ = (readerId: number, bookGuid: UUID) =>
    this.favouritesFacade.favouriteBooks$(readerId)
      .pipe(
        filter(noNullOrUndefined()),
        map((favourites: FavouriteBook[]) => favourites.find(f => f.bookGuid === bookGuid))
      );

}
