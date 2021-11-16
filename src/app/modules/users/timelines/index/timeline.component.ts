import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeLineViewService } from './services/timeline-view.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, tap, takeUntil, map } from 'rxjs/operators';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { TimeLineActivity } from '../../../api/timelines/models/timeline-activity.interface';
import { NEW_FOLLOWER, LOST_FOLLOWER, NEW_BOOK_IN_BOOKCASE, selectActivityData, NEW_REVIEW, ActivityType, ADDED_BOOK } from '../../../api/timelines/models/activity-type.interface';
import { NavigateTo } from 'src/app/modules/shared/common/navigate-to';
import { Book } from 'src/app/modules/api/books/models';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { PreviewBookcaseSettingsComponent } from 'src/app/modules/bookcases/bookcase-settings/index/preview-bookcase-settings.component';
import { TimelineNotFound } from '../models/timeline-not-found';
import { TimeLine } from 'src/app/modules/api/timelines/models/timeline.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: []
})
export class TimelineComponent implements OnInit, OnDestroy {

  public readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly viewService: TimeLineViewService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly router: Router,
    public readonly modalService: ModalService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        tap((paramMap: ParamMap) => this.viewService.pageFacade.setTimeLineId(+paramMap.get('id'))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.viewService.timeLineFacade.activitiesPageResult$
      .pipe(
        filter(noNullOrUndefined()),
        map((s: PageResult) => s.items),
        map((activities: TimeLineActivity[]) => activities.filter((n, i, arr) => arr.indexOf(arr.find(f => f.activityData.activityObjectGuid === n.activityData.activityObjectGuid)) === i)),
        tap(selectActivityData(NEW_REVIEW, (activity) => this.viewService.booksFacade.selectBookByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(ADDED_BOOK, (activity) => this.viewService.booksFacade.selectBookByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(NEW_FOLLOWER, (activity) => this.viewService.readersFacade.selectReaderByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(NEW_BOOK_IN_BOOKCASE, (activity) => this.viewService.booksFacade.selectBookByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(LOST_FOLLOWER, (activity) => this.viewService.readersFacade.selectReaderByGuid(activity.activityData.activityObjectGuid))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    // this.viewService.timeLineFacade.error$
    //   .pipe(
    //     filter(noNullOrUndefined()),
    //     filter((error) => error instanceof (TimelineNotFound)),
    //     takeUntil(this.unsubscribe$)
    //   ).subscribe(() => this.router.navigate(['not_found']))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openBookcaseSettings() {
    this.modalService
      .withTitle("User bookcase")
      .withContent(PreviewBookcaseSettingsComponent)
      .withWidth('700px')
      .openModal();
  }

  onMoveToReader(event: NavigateTo) {
    this.router.navigateByUrl(`users/${event.objectId}/profile`);
  }

  onActivityToggle(activity: TimeLineActivity) {
    this.viewService.pageFacade.toggleActivity(activity);
  }

  addOrRemoveHiddenActivities(flag: boolean) {
    this.viewService.pageFacade.includeHiddenActivities(flag)
  }

  onBookActivityExpandChange(activityType: ActivityType, book: Book) {
    this.viewService.pageFacade.expandActivity(activityType, book);
  }

  onBookReviewExpandChange(activityType: ActivityType, book: Book) {
    this.viewService.pageFacade.expandActivity(activityType, book);
  }

  changeTimeLinePage(event: PageChangeEvent) {
    this.viewService.pageFacade.changePage(event.currentPage - 1);
  }

  showTimeLineOptions = (timeline: TimeLine) => this.viewService.authService.isLoggedIn()
    && timeline.readerId === this.viewService.authService.userId;
}
