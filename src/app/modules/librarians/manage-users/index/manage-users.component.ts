import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { AuthFacade } from 'src/app/modules/auth/store/auth-state/auth.facade';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { PageChangeEvent } from 'src/app/modules/shared/common/page-change.event';
import { PageResult } from 'src/app/modules/shared/common/page-result';
import { DEFAULT_QUERY, SEARCH_QUERY } from 'src/app/modules/shared/common/query';
import { SearchEvent } from 'src/app/modules/shared/common/search.event';
import { ProfileFacade } from 'src/app/modules/users/profiles/store/profile/profile.facade';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { ManageLibrarianFacade } from '../store/manage-librarian.facade';
import { ManageUsersSearchComponent } from './components/manage-users-search/manage-users-search.component';
import { ManageUsersPageService } from './services/manage-users.service';
import { PromotionWaitersPageService } from './services/promotion-waiters.service';
import { ReadersFacade } from 'src/app/modules/users/readers/store/readers/reader.facade';
import { AddLibrarianModel } from 'src/app/modules/api/librarians/models/add-librarian.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'manage-users-component',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUsersComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  public readonly librariansSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly searchUser$: Subject<string> = new Subject<string>();
  public readonly pageSize = 10;

  public avatarUrl = (userId: number) => `${environment.upload}/avatars/${userId}`;

  @ViewChild("search", { static: false }) searchComponent: ManageUsersSearchComponent

  constructor(public readonly manageUsersService: ManageUsersPageService,
    public readonly manageLibrariansFacade: ManageLibrarianFacade,
    public readonly readersFacade: ReadersFacade,
    public readonly profileFacade: ProfileFacade,
    public readonly authFacade: AuthFacade,
    public readonly authService: AuthService,
    public readonly promotionWaitersService: PromotionWaitersPageService) { }

  ngOnInit() {
    this.readersFacade.searchReaders(DEFAULT_QUERY());

    this.searchUser$
      .asObservable()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((value: string) => this.readersFacade.searchReaders(SEARCH_QUERY(value)));

    this.readersFacade.searchReadersPage$
      .pipe(
        filter(noNullOrUndefined()),
        map((pageResult: PageResult) => pageResult.items),
        tap((items: any[]) => items.forEach(item => this.profileFacade.selectProfile(item.readerId))),
        map((items: any[]) => items.map(item => item.readerId)),
        tap((ids: number[]) => this.promotionWaitersService.manageLibrariansFacade.selectPromotionWaitersPage(ids, DEFAULT_QUERY())),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.manageUsersService.changePage$
      .asObservable()
      .pipe(
        filter(noNullOrUndefined()),
        tap((value: number) => this.readersFacade.searchReaders(SEARCH_QUERY(this.searchComponent.searchInput.value, value - 1, this.pageSize))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.promotionWaitersService.promoteUser$
      .asObservable()
      .pipe(
        tap((guid) => this.promotionWaitersService.manageLibrariansFacade.createLibrarian(new AddLibrarianModel(guid))),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.promotionWaitersService.degradeUser$
      .asObservable()
      .pipe(
        filter(f => f !== undefined),
        tap(reader => this.promotionWaitersService.manageLibrariansFacade.degradeLibrarian(reader.identification.guid)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.manageUsersService.blockAccount$
      .asObservable()
      .pipe(
        tap((value: UUID) => this.authFacade.blockAccount(value)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onUserSearch(event: SearchEvent) {
    this.searchUser$.next(this.searchComponent.searchInput.value);
  }

  promoteToLibrarian(guid: UUID) {
    this.promotionWaitersService.promoteUser$.next(guid);
  }

  degradeToUser(reader: Reader) {
    this.promotionWaitersService.degradeUser$.next(reader);
  }

  onPageChange(event: PageChangeEvent) {
    this.manageUsersService.changePage$.next(event.currentPage);
  }

  selectUsers() {
    this.librariansSelected$.next(false);
  }

  selectLibrarians() {
    this.librariansSelected$.next(true);
  }

  blockAccount(readerGuid: UUID) {
    this.manageUsersService.blockAccount$.next(readerGuid);
  }

  isCurrentUser(reader: Reader) {
    return reader.identification.guid.toString() === this.authService.userGuid
  }


}
