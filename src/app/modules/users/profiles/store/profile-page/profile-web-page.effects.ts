import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { AuthorFacade } from "src/app/modules/authors/store/authors/author.facade";
import { BookcaseFacade } from "src/app/modules/bookcases/store/bookcases/bookcase.facade";
import { BookFacade } from "src/app/modules/books/store/book.facade";
import { minLength, noNullOrUndefined } from "src/app/modules/shared/common/operator-extensions";
import { DEFAULT_QUERY, SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { FollowersFacade } from "../../../reader-followers/followers.facade";
import { ReadersFacade } from "../../../readers/store/readers/reader.facade";
import { ReaderStatisticsFacade } from "../../../statistics/store/reader-statistics.facade";
import { TimeLineFacade } from "../../../timelines/store/timeline.facade";
import { ADD_FAVOURITE_AUTHOR, ADD_FAVOURITE_BOOK } from "../../favourites/store/add-favourite/add-favourite.actions";
import { FavouritesFacade } from "../../favourites/store/favourites.facade";
import { REMOVE_FAVOURITE_AUTHOR, REMOVE_FAVOURITE_BOOK } from "../../favourites/store/remove-favourite/remove-favourite.actions";
import { ProfileFacade } from "../profile/profile.facade";
import * as fromActions from './profile-web-page.actions';

@Injectable()
export class ProfileWebPageEffects {

  constructor(private actions$: Actions,
    private readonly readersFacade: ReadersFacade,
    private readonly profilesFacade: ProfileFacade,
    private readonly authorsFacade: AuthorFacade,
    private readonly booksFacade: BookFacade,
    private readonly bookcaseFacade: BookcaseFacade,
    private readonly statisticsFacade: ReaderStatisticsFacade,
    private readonly followersFacade: FollowersFacade,
    private readonly favouritesFacade: FavouritesFacade,
    private readonly timeLineFacade: TimeLineFacade,
    private readonly authService: AuthService) { }

  setReaderIdOnProfilePage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_READER_ID_ON_PROFILE_PAGE),
      map(action => action.payload.readerId),
      filter(noNullOrUndefined()),
      tap((readerId: number) => this.readersFacade.selectReader(readerId)),
      tap(() => {
        if (this.authService.isLoggedIn())
          this.readersFacade.selectReader(this.authService.userId);
      }),
      tap((readerId: number) => this.statisticsFacade.selectReaderStatistics(readerId)),
      tap((readerId: number) => this.statisticsFacade.selectReaderRatingsStatistics(readerId)),
      tap((readerId: number) => this.profilesFacade.selectProfile(readerId)),
      tap((readerId: number) => this.favouritesFacade.selectFavouriteAuthors(readerId)),
      tap((readerId: number) => this.favouritesFacade.selectFavouriteBooks(readerId)),
      tap((readerId: number) => this.followersFacade.selectFollowers(readerId, DEFAULT_QUERY())),
      tap(() => this.followersFacade.selectFollowings(this.authService.userId, DEFAULT_QUERY())),
      tap((readerId: number) => this.followersFacade.isFollowing(readerId)),
      tap((readerId: number) => this.timeLineFacade.selectReaderTimeLine(readerId)),

    ), { dispatch: false })

  addProfileFavouriteBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PROFILE_FAVOURITE_BOOK),
      map(action => action.payload.guid),
      switchMap((bookGuid) => [ADD_FAVOURITE_BOOK({ payload: { bookGuid } })])
    ));

  addProfileFavouriteAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_PROFILE_FAVOURITE_AUTHOR),
      map(action => action.payload.guid),
      switchMap((authorGuid) => [ADD_FAVOURITE_AUTHOR({ payload: { authorGuid } })])
    ))

  removeProfileFavouriteBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_PROFILE_FAVOURITE_BOOK),
      map(action => action.payload.guid),
      switchMap((bookGuid) => [REMOVE_FAVOURITE_BOOK({ payload: { bookGuid } })])
    ))

  removeProfileFavouriteAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REMOVE_PROFILE_FAVOURITE_AUTHOR),
      map(action => action.payload.guid),
      switchMap((authorGuid) => [REMOVE_FAVOURITE_AUTHOR({ payload: { authorGuid } })])
    ));

  searchFavouriteAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SEARCH_FAVOURITE_AUTHORS),
      filter(noNullOrUndefined()),
      filter(minLength(3)),
      map((action: any) => SEARCH_QUERY(action.payload.value)),
      switchMap((query) => [this.authorsFacade.findAuthor(query)])
    ), { dispatch: false });

  searchFavouriteBook$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SEARCH_FAVOURITE_BOOKS),
      filter(noNullOrUndefined()),
      filter(minLength(3)),
      map((action: any) => SEARCH_QUERY(action.payload.value)),
      switchMap((query) => [this.booksFacade.searchBookByTitle(query)])
    ), { dispatch: false })




}
