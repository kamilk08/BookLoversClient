import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenerateTokenFacade } from '../store/generate-token.facade';

@Component({
  selector: 'app-password-token',
  templateUrl: './password-token.component.html',
  styleUrls: ['./password-token.component.scss']
})
export class PasswordTokenComponent implements OnInit {

  constructor(public readonly facade: GenerateTokenFacade) { }

  ngOnInit() {
  }

  generateToken(form: FormGroup) {
    this.facade.submitForm(form);
  }
}
