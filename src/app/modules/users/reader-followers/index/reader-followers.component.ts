import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { SEARCH_QUERY } from 'src/app/modules/shared/common/query';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { ProfileFacade } from '../../profiles/store/profile/profile.facade';
import { ReadersFacade } from '../../readers/store/readers/reader.facade';
import { ReaderStatisticsFacade } from '../../statistics/store/reader-statistics.facade';
import { FollowersFacade } from '../followers.facade';
import { FollowersPageFacade } from '../store/followers-page/followers-page.facade';
import { StartFollowingChange } from './components/start-following-reader/events/start-following-change.event';
import { StopFollowingChange } from './components/stop-following-reader/events/stop-following-change.event';

@Component({
  selector: 'app-index',
  templateUrl: './reader-followers.component.html',
  styleUrls: ['./reader-followers.component.scss']
})
export class ReaderFollowersComponent implements OnInit, OnDestroy {

  public readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly activatedRoute: ActivatedRoute,
    public readonly pageFacade: FollowersPageFacade,
    public readonly followersFacade: FollowersFacade,
    public readonly statisticsFacade: ReaderStatisticsFacade,
    public readonly readersFacade: ReadersFacade,
    public readonly profileFacade: ProfileFacade,
    public readonly authService: AuthService
  ) { }


  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        filter(f => f !== undefined),
        tap(params => this.pageFacade.setReaderIdOnFollowersPage(+params.get('id'))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.pageFacade.readerId$
      .pipe(
        filter(noNullOrUndefined()),
        switchMap((readerId) => this.followersFacade.followersPage$(readerId)),
        filter(noNullOrUndefined()),
        tap((pageResult: PageResult) => pageResult.items.forEach(id => this.statisticsFacade.selectReaderStatistics(id))),
        tap((pageResult: PageResult) => pageResult.items.forEach(id => this.readersFacade.selectReader(id))),
        tap((pageResult: PageResult) => pageResult.items.forEach(id => this.followersFacade.selectFollowers(id, SEARCH_QUERY('')))),
        tap((stream) => this.pageFacade.setFollowersCount(stream.totalItems)),
        takeUntil(this.unsubscribe$),
      ).subscribe();

    this.pageFacade.readerId$
      .pipe(
        filter(noNullOrUndefined()),
        switchMap(readerId => this.followersFacade.followingsPage$(readerId)),
        filter(noNullOrUndefined()),
        tap((pageResult: PageResult) => pageResult.items.forEach(id => this.readersFacade.selectReader(id))),
        tap((pageResult: PageResult) => pageResult.items.forEach(id => this.statisticsFacade.selectReaderStatistics(id))),
        tap((pageResult: PageResult) => pageResult.items.forEach(id => this.followersFacade.selectFollowers(id, SEARCH_QUERY('')))),
        tap((stream) => this.pageFacade.setFollowingsCount(stream.totalItems)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.followersFacade.addingFollower$
      .pipe(
        filter(noNullOrUndefined()),
        filter(f => f === true),
        withLatestFrom(this.pageFacade.currentFollowingsCount$),
        map(stream => ({ followingsCount: stream[1] })),
        tap(stream => this.pageFacade.setFollowingsCount(stream.followingsCount + 1)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.followersFacade.removingFollower$
      .pipe(
        filter(noNullOrUndefined()),
        filter(f => f == true),
        withLatestFrom(this.pageFacade.currentFollowingsCount$),
        map(stream => ({ followingsCount: stream[1] })),
        tap(stream => this.pageFacade.setFollowingsCount(stream.followingsCount - 1)),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFollowersChangePage(event: PageChangeEvent) {
    this.pageFacade.nextFollowersPage(event.currentPage - 1);
  }

  onFollowingsChangePage(event: PageChangeEvent) {
    this.pageFacade.nextFollowingsPage(event.currentPage - 1);
  }

  onSearchPhrase(event: SearchEvent) {
    this.pageFacade.setSearchPhrase(event.phrase);
  }

  moveToFollowers() {
    this.pageFacade.moveToFollowers();
  }

  moveToFollowings() {
    this.pageFacade.moveToFollowings();
  }

  onUnFollowChange(event: StopFollowingChange) {
    this.followersFacade.removeFollower(event.followed, event.followedBy)
  }

  onFollowChange(event: StartFollowingChange) {
    this.followersFacade.addFollower(event.followed, event.followedBy);
  }

  public get isProcessing$() {
    return combineLatest(this.followersFacade.processingFollowersPage$, this.followersFacade.processingFollowingsPage$)
      .pipe(
        map(stream => { return { processingFollowers: stream[0], processingFollowings: stream[1] } }),
        map(stream => stream.processingFollowers || stream.processingFollowings)
      );
  };

  public readonly sumOfFollowersAndFollowings$ = () => this.pageFacade.currentFollowersCount$
    .pipe(
      withLatestFrom(this.pageFacade.currentFollowingsCount$),
      map(stream => stream[0] + stream[1])
    );

  public shouldAddOrRemoveFollowerSignBeVisible$() {
    return this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        map((paramMap: ParamMap) => this.authService.userId === +paramMap.get('id'))
      )
  }
}

