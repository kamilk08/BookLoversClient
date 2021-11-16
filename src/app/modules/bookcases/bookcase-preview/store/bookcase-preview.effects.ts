import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { RatingsOverviewFacade } from "src/app/modules/classification/ratings-overview/store/ratings-overview.facade";
import { ReviewsFacade } from "src/app/modules/users/reviews/store/reviews/reviews.facade";

import * as fromActions from './bookcase-preview.actions';

@Injectable()
export class BookcasePreviewEffects {

  constructor(private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly reviewsFacade: ReviewsFacade,
    private readonly ratingsOverviewFacade: RatingsOverviewFacade
  ) { }

  setBookcaseToManage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_BOOK_ID_ON_BOOKCAS_PREVIEW),
      map(action => action.payload.bookId),
      tap((bookId) => this.ratingsOverviewFacade.selectRatingOverview(bookId)),
      tap((bookId) => this.reviewsFacade.selectReview(this.authService.userId, bookId))
    ), { dispatch: false });


  selectShelf$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_SHELF),
      switchMap(action => [
        fromActions.ADD_SHELF_TAG({ payload: { shelf: action.payload.shelf } }),
        fromActions.REMOVE_AVAILABLE_SHELF({ payload: { shelf: action.payload.shelf } })
      ])
    ));

  selectShelfTag$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SELECT_SHELF_TAG),
      switchMap(action => [
        fromActions.REMOVE_SHELF_TAG({ payload: { shelf: action.payload.shelfTag.tagData.linkedShelf } }),
        fromActions.ADD_AVAILABE_SHELF({ payload: { shelf: action.payload.shelfTag.tagData.linkedShelf } })
      ])
    ));

}
