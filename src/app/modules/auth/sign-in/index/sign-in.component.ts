import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SignInFacade } from '../store/sign-in.facade';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  constructor(
    public readonly facade: SignInFacade) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.facade.resetForm();
  }

  signIn(form: FormGroup) {
    this.facade.submitForm(form);
  }

  // moveToSignUpPage() {
  //   this.router.navigate(['sign_up']);
  // }

  // moveToResetPasswordPage(){
  //   this.router.navigate(['password_token']);
  // }
}
