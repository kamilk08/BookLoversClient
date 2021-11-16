import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { switchMap, map, filter, takeUntil, tap } from 'rxjs/operators';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { Reader } from 'src/app/modules/api/readers/models/reader.model';
import { ProfileFacade } from '../../../store/profile/profile.facade';
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';
import { FormGroup } from '@angular/forms';
import { ReadersFacade } from 'src/app/modules/users/readers/store/readers/reader.facade';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-manage-profile-modal',
  templateUrl: './manage-profile-modal.component.html',
  styleUrls: ['./manage-profile-modal.component.scss']
})
export class ManageProfileModalComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor
    (
      private modal: NzModalRef,
      public readonly authService: AuthService,
      public readonly facade: ProfileFacade,
      public readonly readersFacade: ReadersFacade,
      public readonly pageFacade: ProfileWebPageFacade
    ) { }

  ngOnInit() {
    this.readersFacade.selectReader(this.authService.userId);
    this.facade.selectProfile(this.authService.userId);

    this.readersFacade.reader$(this.authService.userId)
      .pipe(
        filter(noNullOrUndefined()),
        map((reader: Reader) => reader.identification.id),
        switchMap((readerId: number) => this.facade.profileByUserId$(readerId)),
        takeUntil(this.unsubscribe$),
      ).subscribe(profile => this.pageFacade.updateChangeEmailForm(profile));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close(): void {
    this.modal.destroy();
  }

  onSubmit(form: FormGroup) {
    this.pageFacade.submitChangeProfileForm(form);
    this.modal.destroy();
  }

}
