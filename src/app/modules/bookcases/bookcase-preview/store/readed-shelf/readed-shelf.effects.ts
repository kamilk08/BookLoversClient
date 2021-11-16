import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Book } from "src/app/modules/api/books/models";
import { Rating } from "src/app/modules/api/ratings/models/rating.model";
import { RatingsOverview } from "src/app/modules/api/ratings/models/ratings-overview.model";
import { ReviewContent } from "src/app/modules/api/reviews/models/review-content.model";
import { Review } from "src/app/modules/api/reviews/models/review.model";
import { ReviewedBook } from "src/app/modules/api/reviews/models/reviewed-book.model";
import { ReviewedBy } from "src/app/modules/api/reviews/models/reviewed-by.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { RatingsOverviewFacade } from "src/app/modules/classification/ratings-overview/store/ratings-overview.facade";
import { STARS_CLEARED } from "src/app/modules/classification/ratings/common/stars";
import { ADD_REVIEW } from "src/app/modules/users/reviews/store/add-review/add-review-actions";
import { EDIT_REVIEW } from "src/app/modules/users/reviews/store/edit-review/edit-review.actions";
import { Bookcase } from "../../../models";
import { BookcasePreviewFacade } from "../bookcase-preview.facade";

import * as fromActions from '../readed-shelf/readed-shelf.actions';

@Injectable()
export class ReadedShelfEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: BookcasePreviewFacade,
    private readonly authService: AuthService,
    private readonly ratingsOverviewFacade: RatingsOverviewFacade
  ) {

  }

  submitBookcasePreviewForm$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SUBMIT_BOOKCASE_PREVIEW_FORM),
      withLatestFrom(this.facade.hasReview$, this.facade.reviewForm$),
      map((stream) => {
        return {
          hasReview: stream[1],
          book: stream[0].payload.book,
          bookcase: stream[0].payload.bookcase,
          hasRating: stream[0].payload.ratingsOverview.hasUserRating(this.authService.userId),
          reviewForm: stream[2],
          ratingsOverview: stream[0].payload.ratingsOverview
        }
      }),
      switchMap((stream) => [
        this.getReviewAction(stream.hasReview, stream.book, stream.reviewForm),
        this.getRatingAction(stream.hasRating, stream.book, stream.bookcase, stream.ratingsOverview)])
    ));

  reviewAdded$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REVIEW_ADDED),
      withLatestFrom(this.facade.reviewForm$),
      map(stream => { return { form: stream[1], isFormValid: stream[1].valid, book: stream[0].payload.book } }),
      tap(stream => stream.form.updateValueAndValidity()),
      switchMap((stream) => [stream.isFormValid ?
        ADD_REVIEW({ payload: { review: this.getUserReview(stream.book, stream.form) } }) :
        fromActions.UPDATE_REVIEW_FORM_VALIDITY()])
    ));

  reviewChanged$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REVIEW_CHANGED),
      withLatestFrom(this.facade.reviewForm$),
      map(stream => { return { form: stream[1], isFormValid: stream[1].valid } }),
      switchMap((stream) => [stream.isFormValid ?
        EDIT_REVIEW({ payload: { review: this.changeCurrentReview(stream.form) } }) :
        fromActions.UPDATE_REVIEW_FORM_VALIDITY()])
    ));

  ratingAdded$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RATING_ADDED),
      withLatestFrom(this.facade.selectedGrade$),
      map(stream => { return { selectedGrade: stream[1], book: stream[0].payload.book, bookcase: stream[0].payload.bookcase } }),
      filter((stream) => stream.selectedGrade.dirty),
      tap((stream) => this.ratingsOverviewFacade.addRating({ id: stream.book.identification.id, guid: stream.book.identification.guid },
        this.createNewRating(stream.book, stream.selectedGrade.value), stream.bookcase.identification.guid)),
    ), { dispatch: false });


  ratingChangedOrRemoved$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RATING_CHANGED_OR_REMOVED),
      withLatestFrom(this.facade.selectedGrade$),
      map(stream => { return { selectedGrade: stream[1], ratingsOverview: stream[0].payload.ratingsOverview } }),
      switchMap((stream) => [stream.selectedGrade.value === STARS_CLEARED ? fromActions.RATING_REMOVED({ payload: { ratingsOverview: stream.ratingsOverview } })
        : fromActions.RATING_CHANGED({ payload: { ratingsOverview: stream.ratingsOverview } })])
    ));

  ratingRemoved$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RATING_REMOVED),
      tap(action => this.ratingsOverviewFacade.removeRating(action.payload.ratingsOverview, this.authService.userId))
    ), { dispatch: false });


  ratingChanged$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.RATING_CHANGED),
      withLatestFrom(this.facade.oldGrade$, this.facade.selectedGrade$),
      map(stream => { return { oldGrade: stream[1], selectedGrade: stream[2], ratingsOverview: stream[0].payload.ratingsOverview } }),
      filter((stream) => stream.oldGrade !== null),
      filter((stream) => stream.selectedGrade.dirty),
      filter((stream) => stream.selectedGrade.value !== stream.oldGrade.stars),
      filter((stream) => stream.selectedGrade.value !== STARS_CLEARED),
      tap((stream) => this.ratingsOverviewFacade.changeRating(stream.ratingsOverview, new Rating(stream.ratingsOverview.book.bookId, this.authService.userId, stream.selectedGrade.value))),
    ), { dispatch: false })


  private getReviewAction(hasReview: boolean, book: Book, reviewForm: FormGroup) {
    if (!hasReview) return fromActions.REVIEW_ADDED({ payload: { book } });
    else {
      if (this.reviewHasNotChanged(reviewForm)) return fromActions.NO_ACTION();
      else return fromActions.REVIEW_CHANGED();
    }
  }

  private getRatingAction(hasRating: boolean, book: Book, bookcase: Bookcase, ratingsOverview: RatingsOverview) {
    return !hasRating ? fromActions.RATING_ADDED({ payload: { book, bookcase } }) :
      fromActions.RATING_CHANGED_OR_REMOVED({ payload: { ratingsOverview } });
  }

  private getUserReview(book: Book, reviewForm: FormGroup) {
    const content = reviewForm.get('comment').value;
    const spoilerComment = reviewForm.get('spoilerComment').value as boolean;

    const reviewContent = new ReviewContent(content, new Date(), spoilerComment);
    const reviewedBook = new ReviewedBook(book.identification.id, book.identification.guid);
    const reviewedBy = new ReviewedBy(this.authService.userId, this.authService.userGuid);

    return new Review(reviewContent, reviewedBook, reviewedBy);
  }

  private reviewHasNotChanged(reviewForm: FormGroup) {
    const comment = reviewForm.get('comment').value;
    const oldReview = reviewForm.get('oldReview').value as Review;
    const spoilerComment = reviewForm.get('spoilerComment').value as boolean;

    if (comment !== oldReview.reviewContent.reviewText) return false;
    if (spoilerComment !== oldReview.reviewContent.markedAsSpoiler) return false

    return true;
  }

  private changeCurrentReview(reviewForm: FormGroup) {
    const oldReview = reviewForm.get('oldReview').value as Review;
    const comment = reviewForm.get('comment').value;
    const spoilerComment = reviewForm.get('spoilerComment').value as boolean;
    oldReview.changeReview(comment, spoilerComment, new Date());

    return oldReview;
  }

  private createNewRating(book: Book, grade: number) {
    return new Rating(book.identification.id, this.authService.userId, grade);
  }
}


