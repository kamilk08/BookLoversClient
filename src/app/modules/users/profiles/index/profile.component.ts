import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { ProfileViewService } from './services/profile-view.service';
import { DEFAULT_QUERY } from 'src/app/modules/shared/common/query';
import { FollowUserChange } from './components/profile-container/events/follow-user-change.event';
import { filter, tap, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { Subject } from 'rxjs';
import { TimeLine } from '../../../api/timelines/models/timeline.interface';
import { TimeLineActivity } from '../../../api/timelines/models/timeline-activity.interface';
import { AddFavouriteAuthorModalComponent } from './components/add-favourite-author-modal/add-favourite-author-modal.component';
import { AddFavouriteBookModalComponent } from './components/add-favourite-book-modal/add-favourite-book-modal.component';
import { ManageProfileModalComponent } from './components/manage-profile-modal/manage-profile-modal.component';
import { UUID } from 'angular2-uuid';
import { ChangeAvatar } from '../../../api/avatars/models/change-avatar.model';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { ChangeEmailModalComponent } from './components/change-email-modal/change-email-modal.component';
import { AvatarChange } from 'src/app/modules/shared/models/avatar-change.event';
import { ProfileWebPageFacade } from '../store/profile-page/profile-web-page.facade';
import { ADDED_BOOK, LOST_FOLLOWER, NEW_BOOK_IN_BOOKCASE, NEW_FOLLOWER, NEW_REVIEW, selectActivityData } from 'src/app/modules/api/timelines/models/activity-type.interface';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly pageFacade: ProfileWebPageFacade,
    public readonly viewService: ProfileViewService,
    public readonly activatedRoute: ActivatedRoute,
    public readonly modalService: ModalService,
    public readonly router: Router,
    public readonly authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        tap((params: ParamMap) => this.pageFacade.setReaderIdOnProfilePage(+params.get('id'))),
        takeUntil(this.unsubscribe$),
      ).subscribe();

    this.pageFacade.readerId$
      .pipe(
        filter(noNullOrUndefined()),
        switchMap(readerId => this.viewService.favouritesFacade.favouriteAuthors$(readerId)),
        withLatestFrom(this.pageFacade.readerId$),
        map(stream => { return { favouriteAuthors: stream[0], readerId: stream[1] } }),
        switchMap(stream => this.viewService.favouritesFacade.favouriteBooks$(stream.readerId)
          .pipe(
            map(books => { return { authors: stream.favouriteAuthors, books, readerId: stream.readerId } })
          )),
        filter(f => f.authors !== undefined && f.books !== undefined),
        tap(stream => stream.authors.length > 0 ? this.viewService.authorsFacade.selectMultipleAuthorsByGuid(stream.authors.map(s => s.authorGuid)) : false),
        tap(stream => stream.books.length > 0 ? this.viewService.bookFacade.selectMultipleBooksByGuid(stream.books.map(s => s.bookGuid)) : false),
        takeUntil(this.unsubscribe$)
      ).subscribe()

    this.pageFacade.readerId$
      .pipe(
        switchMap((readerId) => this.viewService.timeLineFacade.readerTimeLine$(readerId)),
        filter(noNullOrUndefined()),
        map((timeLine: TimeLine) => timeLine.indentification.id),
        tap((id) => this.viewService.timeLineFacade.selectActivities(id, DEFAULT_QUERY(0, 8), false)),
        switchMap(() => this.viewService.timeLineFacade.activitiesPageResult$),
        filter(noNullOrUndefined()),
        map(result => result.items),
        map((activities: TimeLineActivity[]) => activities.filter((n, i, arr) => arr.indexOf(arr.find(f => f.activityData.activityObjectGuid === n.activityData.activityObjectGuid)) === i)),
        tap(selectActivityData(NEW_BOOK_IN_BOOKCASE, (activity) => this.viewService.bookFacade.selectBookByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(ADDED_BOOK, (activity) => this.viewService.bookFacade.selectBookByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(NEW_FOLLOWER, (activity) => this.viewService.readersFacade.selectReaderByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(LOST_FOLLOWER, (activity) => this.viewService.readersFacade.selectReaderByGuid(activity.activityData.activityObjectGuid))),
        tap(selectActivityData(NEW_REVIEW, (activity) => this.viewService.bookFacade.selectBookByGuid(activity.activityData.activityObjectGuid)),
          takeUntil(this.unsubscribe$)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  manageProfile() {
    return this.modalService.withTitle('Edit profile')
      .withContent(ManageProfileModalComponent)
      .openModal();
  }

  addFavouriteAuthor() {
    this.modalService.withTitle('Add favourite author')
      .withContent(AddFavouriteAuthorModalComponent)
      .withWidth('620px')
      .openModal();
  }

  addFavouriteBook() {
    this.modalService.withTitle('Add favourite book')
      .withContent(AddFavouriteBookModalComponent)
      .withWidth('700px')
      .openModal();
  }

  onAvatarChange(event: AvatarChange) {
    const avatar: string = event.avatar;
    const fileName: string = event.fileName;

    this.viewService.avatarFacade.changeAvatar(new ChangeAvatar(avatar, fileName));
  }

  onAvatarRemove() {
    this.viewService.avatarFacade.changeAvatar(new ChangeAvatar(undefined, undefined));
  }

  removeFavouriteAuthor(authorGuid: UUID) {
    this.pageFacade.removeProfileAuthor(authorGuid);
  }

  removeFavouriteBook(bookGuid: UUID) {
    this.pageFacade.removeProfileBook(bookGuid);
  }

  onFollowChange(event: FollowUserChange) {
    event.isFollowed ? this.viewService.followersFacade.addFollower(event.followed, event.followedBy) :
      this.viewService.followersFacade.removeFollower(event.followed, event.followedBy)
  }

  showChangePassword() {
    this.modalService
      .withTitle('Change password')
      .withContent(ChangePasswordModalComponent)
      .openModal();
  }

  showChangeEmail() {
    this.modalService
      .withTitle('Change email')
      .withContent(ChangeEmailModalComponent)
      .openModal();
  }
}
