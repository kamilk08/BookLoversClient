import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { DEFAULT_PAGE, SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { ReadersFacade } from "../../../readers/store/readers/reader.facade";
import { ReaderStatisticsFacade } from "../../../statistics/store/reader-statistics.facade";
import { FollowersFacade } from "../../followers.facade";
import { FollowersPageFacade } from "./followers-page.facade";
import * as fromActions from './followers-page.actions';


@Injectable()
export class FollowersPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly facade: FollowersPageFacade,
    private readonly readersFacade: ReadersFacade,
    private readonly followersFacade: FollowersFacade,
    private readonly statisticsFacade: ReaderStatisticsFacade) {

  }

  setReaderIdOnFollowersPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_READER_ID_ON_FOLLOWERS_PAGE),
      map(action => action.payload.readerId),
      withLatestFrom(this.facade.pageSize$),
      map(stream => ({ readerId: stream[0], pageSize: stream[1] })),
      tap((stream) => this.statisticsFacade.selectReaderStatistics(stream.readerId)),
      tap((stream) => this.readersFacade.selectReader(stream.readerId)),
      tap((stream) => this.followersFacade.selectFollowers(stream.readerId, SEARCH_QUERY('', DEFAULT_PAGE, stream.pageSize))),
      tap((stream) => this.followersFacade.selectFollowings(stream.readerId, SEARCH_QUERY('', DEFAULT_PAGE, stream.pageSize))),
    ), { dispatch: false })

  setFollowersPageOption$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_FOLLOWERS_PAGE_OPTION),
      map(action => action.payload.pageOption),
      withLatestFrom(this.facade.readerId$, this.facade.pageSize$),
      map(stream => ({ pageOption: stream[0], readerId: stream[1], pageSize: stream[2] })),
      tap(stream => this.selectOption(stream.readerId, stream.pageSize)[stream.pageOption])
    ), { dispatch: false });

  searchPhrase$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_SEARCH_PHRASE_ON_FOLLOWERS_PAGE),
      map(action => action.payload.phrase),
      withLatestFrom(this.facade.showFollowers$, this.facade.readerId$, this.facade.pageSize$),
      map(stream => ({ phrase: stream[0], showFollowers: stream[1], readerId: stream[2], pageSize: stream[3] })),
      tap(stream => stream.showFollowers ? this.followersFacade.selectFollowers(stream.readerId, SEARCH_QUERY(stream.phrase, DEFAULT_PAGE, stream.pageSize))
        : this.followersFacade.selectFollowings(stream.readerId, SEARCH_QUERY(stream.phrase, DEFAULT_PAGE, stream.pageSize)))

    ), { dispatch: false });

  nextFollowersPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEXT_FOLLOWERS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.facade.pageSize$, this.facade.searchPhrase$, this.facade.readerId$),
      map(stream => ({ page: stream[0], pageSize: stream[1], phrase: stream[2], readerId: stream[3] })),
      tap(stream => this.followersFacade.selectFollowers(stream.readerId, SEARCH_QUERY(stream.phrase, stream.page, stream.pageSize)))
    ), { dispatch: false });

  nextFollowingsPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.NEXT_FOLLOWINGS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.facade.pageSize$, this.facade.searchPhrase$, this.facade.readerId$),
      map(stream => ({ page: stream[0], pageSize: stream[1], phrase: stream[2], readerId: stream[3] })),
      tap(stream => this.followersFacade.selectFollowings(stream.readerId, SEARCH_QUERY(stream.phrase, stream.page, stream.pageSize)))
    ), { dispatch: false })


  private selectOption = (readerId: number, pageSize: number) => {
    return {
      1: this.followersFacade.selectFollowers(readerId, SEARCH_QUERY('', DEFAULT_PAGE, pageSize)),
      2: this.followersFacade.selectFollowings(readerId, SEARCH_QUERY('', DEFAULT_PAGE, pageSize))
    }
  }

}
