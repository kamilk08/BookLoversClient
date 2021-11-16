import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromIndex from '../store/index';
import { RESET_PASSWORD } from "./reset-password.actions";

@Injectable()
export class ResetPasswordFacade {

  constructor(private readonly store: Store<fromIndex.ResetPasswordModuleState>) {

  }

  resetPassword(token: string, password: string) {
    this.store.dispatch(RESET_PASSWORD({ payload: { token, password } }));
  }

}
