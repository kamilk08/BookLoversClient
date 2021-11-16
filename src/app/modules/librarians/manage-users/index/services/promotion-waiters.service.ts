import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Subject } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { noNullOrUndefined } from "src/app/modules/shared/common/operator-extensions";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { ProfileFacade } from "src/app/modules/users/profiles/store/profile/profile.facade";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { ManageLibrarianFacade } from "../../store/manage-librarian.facade";
import { ReadersFacade } from "src/app/modules/users/readers/store/readers/reader.facade";
import { PromotionWaiter } from "src/app/modules/api/librarians/models/promotion-waiter.model";
import { PromotionStatus } from "src/app/modules/api/librarians/models/promotion-status.model";

@Injectable()
export class PromotionWaitersPageService {

  public readonly promoteUser$: Subject<UUID> = new Subject<UUID>();
  public readonly degradeUser$: Subject<Reader> = new Subject<Reader>();
  public readonly changePage$: Subject<number> = new Subject<number>();

  constructor(
    public readonly manageLibrariansFacade: ManageLibrarianFacade) { }

  public readonly promotionWaiters$ = () => this.manageLibrariansFacade.promotionWaitersPage$
    .pipe(
      filter(noNullOrUndefined()),
      map((result: PageResult) => result.items),
      map((items) => items.map((item: any) => item.readerId)),
      switchMap(ids => this.manageLibrariansFacade.getPromotionWaiters$(ids)),
      map((pw: PromotionWaiter[]) => pw.filter(f => f.promotionStatus !== PromotionStatus.notAvailable))
    );

  public readonly promotionWaiterAsReader$ = (readersFacade: ReadersFacade, readerId: number) =>
    readersFacade.reader$(readerId)
      .pipe(
        filter(noNullOrUndefined()),
        map((r => r as Reader))
      );

  public readonly totalItems$ = () => this.manageLibrariansFacade.promotionWaitersPage$
    .pipe(
      filter(noNullOrUndefined()),
      map((result: PageResult) => result.totalItems)
    );

  public readonly pagesCount$ = this.manageLibrariansFacade.promotionWaitersPage$
    .pipe(
      filter(noNullOrUndefined()),
      map((result: PageResult) => result.pagesCount)
    );

  public readonly currentPage$ = this.manageLibrariansFacade.promotionWaitersPage$
    .pipe(
      filter(noNullOrUndefined()),
      map((result: PageResult) => result.page + 1)
    );

  public readonly joinAt$ = (profileFacade: ProfileFacade, readerId: number) => profileFacade.profileByUserId$(readerId)
    .pipe(
      filter(noNullOrUndefined()),
      map((profile: Profile) => profile.about.joinedAt)
    );
}
