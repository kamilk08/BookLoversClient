import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { Subject } from 'rxjs';;
import { ProfileWebPageFacade } from '../../../store/profile-page/profile-web-page.facade';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public readonly pageFacade: ProfileWebPageFacade,
    private modalRef: NzModalRef) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.pageFacade.resetChangePasswordForm();
  }

  ngOnInit() {
  }

  close() {
    this.modalRef.destroy();
  }

  onSubmit(form: FormGroup) {
    this.pageFacade.submitChangePasswordForm(form);
    this.modalRef.destroy();
  }

}
