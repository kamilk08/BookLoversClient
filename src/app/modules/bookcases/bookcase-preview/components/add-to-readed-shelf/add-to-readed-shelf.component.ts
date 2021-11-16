import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Bookcase, Shelf } from '../../../models/index';
import { Subject, of } from 'rxjs';
import { takeUntil, filter, tap, map, withLatestFrom, switchMap } from 'rxjs/operators';
import { RatingsOverviewFacade } from 'src/app/modules/classification/ratings-overview/store/ratings-overview.facade';
import { Rating } from 'src/app/modules/api/ratings/models/rating.model';
import { Book } from 'src/app/modules/api/books/models';
import { BookcasePreviewFacade } from '../../store/bookcase-preview.facade';
import { AddBookToShelfFacade } from '../../add-book-to-shelf/store/add-book-to-shelf.facade';
import { RemoveBookcaseBookFacade } from '../../remove-book/store/remove-bookcase-book.facade';
import { READED_SHELF } from '../../../models/shelf-categories';
import { RemoveTagChange } from 'src/app/modules/shared/components/hash-tags/removable-tag/remove-tag.event';
import { RatingsOverview } from 'src/app/modules/api/ratings/models/ratings-overview.model';
import { ReviewsFacade } from 'src/app/modules/users/reviews/store/reviews/reviews.facade';
import { noEmptyArray, noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { Review } from 'src/app/modules/api/reviews/models/review.model';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-to-readed-shelf',
  templateUrl: './add-to-readed-shelf.component.html',
  styleUrls: ['./add-to-readed-shelf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToReadedShelfComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  private removedFromCoreShelf: boolean;

  public book: Book
  public bookcase: Bookcase
  public ratingsOverview: RatingsOverview

  public selectPlug: any;

  constructor(
    public readonly modal: NzModalRef,
    public readonly facade: BookcasePreviewFacade,
    public readonly addBookToShelfFacade: AddBookToShelfFacade,
    public readonly removeBookFacade: RemoveBookcaseBookFacade,
    public readonly reviewsFacade: ReviewsFacade,
    public readonly ratingsOverviewFacade: RatingsOverviewFacade,
    public readonly authService: AuthService) { }


  ngOnInit() {
    this.facade.setBookId(this.book.identification.id);
    this.facade.checkAvailableShelves();

    this.facade.loggedInUserBookcase$
      .pipe(
        filter(noNullOrUndefined()),
        map((bookcase: Bookcase) => bookcase.getShelvesWithBook(this.book.identification.id)),
        filter(noEmptyArray()),
        tap((shelves: Shelf[]) => shelves.forEach(shelf => this.facade.addShelfTag(shelf))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.reviewsFacade.userBookReview$(this.authService.userId, this.book.identification.id)
      .pipe(
        tap((review: Review) => review === undefined ? this.facade.setNoReview() : false),
        filter(noNullOrUndefined()),
        takeUntil(this.unsubscribe$))
      .subscribe((review: Review) => this.facade.updateReviewForm(review))

    this.ratingsOverviewFacade.singleOverview$(this.book.identification.id)
      .pipe(
        filter(noNullOrUndefined()),
        tap((overview: RatingsOverview) => this.ratingsOverview = overview),
        map((overview: RatingsOverview) => overview.getUserRating(this.authService.userId)),
        filter(noNullOrUndefined()),
        takeUntil(this.unsubscribe$)
      ).subscribe((rating: Rating) => this.facade.updateRatingForm(rating))

    this.facade.selectedShelf$
      .pipe(
        filter(noNullOrUndefined()),
        withLatestFrom(this.facade.loggedInUserBookcase$),
        map(stream => { return { bookcase: stream[1], pickedShelf: stream[0] } }),
        tap(stream => this.addBookToShelfFacade.addToBookcase(stream.bookcase, stream.pickedShelf, this.book)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.facade.removedShelfTag$
      .pipe(
        filter(noNullOrUndefined()),
        map(data => data.tagData.linkedShelf),
        tap((shelf: Shelf) => {
          if (shelf.category === READED_SHELF) {
            this.removeBookFacade.removeFromBookcase(this.bookcase, this.book)
          }
          else this.removeBookFacade.removeFromShelf(this.bookcase, shelf, this.book)
        }),
        filter(shelf => shelf.category === READED_SHELF),
        tap(() => this.facade.resetRatingForm()),
        tap(() => this.facade.resetReviewForm()),
        tap(() => this.removedFromCoreShelf = true),
        switchMap(() => this.reviewsFacade.userBookReview$(this.authService.userId, this.book.identification.id)),
        tap((review) => this.reviewsFacade.removeCurrentReview(review)),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.facade.resetBookcasePreview();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onShelfPick(shelf: Shelf) {
    this.facade.selectShelf(shelf);
  }

  onTagRemove(event: RemoveTagChange) {
    this.facade.selectShelfTag(event.tag)
  }

  close() {
    this.modal.destroy({ removedFromCoreShelf: this.removedFromCoreShelf });
  }

  submit(form: FormGroup) {
    this.facade.submitPreivewForm(this.ratingsOverview, this.book, this.bookcase);

    if (form.valid) {
      this.modal.close();
      this.facade.resetReviewForm();
      this.facade.resetRatingForm();
    }
  }

  public avatarUrl = (userId: number) => `${environment.upload}/avatars/${userId}`;

  @HostListener('document:keydown.escape', ['$event']) onEnterPress(event: KeyboardEvent) {
    this.modal.destroy({ removedFromCoreShelf: this.removedFromCoreShelf });
  }
}
