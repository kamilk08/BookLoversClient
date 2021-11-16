import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as fromModule from '../store/index'
import * as fromActions from '../store/generate-token.actions';
import * as fromSelectors from '../store/module.selectors';

@Injectable()
export class GenerateTokenFacade {

  public readonly form$ = this.store.select(fromSelectors.form);

  constructor(private readonly store: Store<fromModule.GenerateTokenModuleState>) { }

  submitForm(form: FormGroup) {
    this.store.dispatch(fromActions.SUBMIT_PASSWORD_TOKEN_FORM({ payload: { form } }));
  }

}
