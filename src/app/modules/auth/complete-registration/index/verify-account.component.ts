import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { VerifyAccountFacade } from '../store/verify-account/verify-account.facade';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(public readonly facade: VerifyAccountFacade) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.facade.resetForm();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  verifyAccount(form: FormGroup) {
    this.facade.submitForm(form);
  }

}
