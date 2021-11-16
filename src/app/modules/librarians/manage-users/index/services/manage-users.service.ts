import { Injectable } from "@angular/core";
import { UUID } from "angular2-uuid";
import { Subject } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { noNullOrUndefined } from "src/app/modules/shared/common/operator-extensions";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { Profile } from "src/app/modules/api/profiles/models/profile.model";
import { ProfileFacade } from "src/app/modules/users/profiles/store/profile/profile.facade";
import { ReadersFacade } from "src/app/modules/users/readers/store/readers/reader.facade";
import { ManageLibrarianFacade } from "../../store/manage-librarian.facade";
import { PromotionWaiter } from "src/app/modules/api/librarians/models/promotion-waiter.model";
import { PromotionStatus } from "src/app/modules/api/librarians/models/promotion-status.model";

@Injectable()
export class ManageUsersPageService {

  public readonly blockAccount$: Subject<UUID> = new Subject<UUID>();
  public readonly changePage$: Subject<number> = new Subject<number>();

  constructor(
  ) { }

  public readonly currentUsers$ = (readersFacade: ReadersFacade, manageLibrarianFacade: ManageLibrarianFacade) => readersFacade.searchReadersPage$
    .pipe(
      filter(noNullOrUndefined()),
      map((pageResult: PageResult) => pageResult.items.map((item: any) => item.readerId)),
      switchMap((ids: number[]) => manageLibrarianFacade.getPromotionWaiters$(ids)),
      map(((pm: PromotionWaiter[]) => pm.filter(s => s.promotionStatus !== PromotionStatus.notAvailable))),
      map((pm: PromotionWaiter[]) => pm.map(s => s.readerId)),
      switchMap((ids: number[]) => readersFacade.multipleReaders$(ids)),
    )

  public readonly usersTotalItems$ = (readersFacade: ReadersFacade) => readersFacade.searchReadersPage$
    .pipe(
      filter(noNullOrUndefined()),
      map((result: PageResult) => result.totalItems)
    );

  public readonly usersCurrentPage$ = (ReadersFacade: ReadersFacade) => ReadersFacade.searchReadersPage$
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
