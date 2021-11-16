import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignUpFacade } from '../store/sign-up.facade';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(public readonly facade: SignUpFacade) { }

  ngOnInit() {
    this.facade.initilizeSignUpForm();
  }

  signUp(form: FormGroup) {
    this.facade.submitSignUpForm(form);
  }

  ngOnDestroy(): void {
    this.facade.resetSubmitForm();
  }

}
