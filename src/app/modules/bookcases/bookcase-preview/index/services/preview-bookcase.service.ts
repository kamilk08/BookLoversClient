import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Book } from 'src/app/modules/api/books/models/book.model';
import { BookcasePreviewFacade } from '../../store/bookcase-preview.facade';
import { Bookcase, Shelf } from '../../../models';
import { ChangeShelfFacade } from '../../change-shelf/store/change-shelf.facade';
import { AddBookToShelfFacade } from '../../add-book-to-shelf/store/add-book-to-shelf.facade';
import { ReviewsPaginationFacade } from 'src/app/modules/users/reviews/store/reviews-pagination.facade';
import { READED_SHELF } from '../../../models/shelf-categories';
import { PreviewBookcaseSettingsComponent } from '../../../bookcase-settings/index/preview-bookcase-settings.component';
import { ChangeShelfComponent } from '../../change-shelf/index/change-shelf.component';
import { AddToReadedShelfComponent } from '../../components/add-to-readed-shelf/add-to-readed-shelf.component';
import { ModalService } from 'src/app/modules/shared/services/modal.service';

@Injectable()
export class PreviewBookcaseService {

  public shelfIcons = [
    { icon: "icon ion-md-checkmark" },
    { icon: "icon ion-md-book" },
    { icon: "icon ion-md-fastforward" }
  ]

  get readedShelfIcon() {
    return this.shelfIcons[0].icon;
  }

  get nowReadingShelfIcon() {
    return this.shelfIcons[1].icon;
  }

  get wantToReadShelfIcon() {
    return this.shelfIcons[2].icon;
  }

  public addToShelf$: Subject<{ shelf: Shelf, book: Book }> = new Subject();

  constructor(
    public readonly previewFacade: BookcasePreviewFacade,
    public readonly changeShelfFacade: ChangeShelfFacade,
    public readonly addBookFacade: AddBookToShelfFacade,
    public readonly reviewsPagination: ReviewsPaginationFacade,
    public readonly modalService: ModalService) {

  }

  public readonly hasBookOnShelf$ = (bookId: number, shelfId: number) => this.previewFacade
    .loggedInUserBookcase$
    .pipe(
      filter(f => f !== undefined),
      map(b => b.hasBookOnShelf(shelfId, bookId))
    );

  public getReadedShelf(bookcase: Bookcase) {
    return bookcase.shelfs.find(p => p.category === READED_SHELF);
  }

  openSettings() {
    return this.modalService.withTitle('User bookcase')
      .withContent(PreviewBookcaseSettingsComponent)
      .withWidth('700px')
      .openModal();
  }

  openChangeShelf(oldShelf: Shelf, newShelf: Shelf, book: Book) {
    return this.modalService
      .withTitle('Notification')
      .withContent(ChangeShelfComponent)
      .isCloseable(false)
      .withParams({ oldShelf: oldShelf, newShelf: newShelf, book })
      .openModal();
  }

  openReadedShelf(book: Book, bookcase: Bookcase, userId: number) {
    return this.modalService.withTitle(`${book.basics.title} review`)
      .withContent(AddToReadedShelfComponent)
      .isCloseable(false)
      .withWidth('700px')
      .withParams({ userId, book, bookcase })
      .openModal();
  }
}
