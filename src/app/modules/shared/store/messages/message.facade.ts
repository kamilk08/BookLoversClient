import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "./actions";

import * as fromIndex from './message.reducer';

@Injectable()
export class MesssagesFacade {

  constructor(private store: Store<fromIndex.MessageState>) {

  }

  public showSuccessMessage(message: string) {
    this.store.dispatch(SHOW_SUCCESS_MESSAGE({ payload: { message } }));
  }

  public showFaliureMessage(message: string) {
    this.store.dispatch(SHOW_FALIURE_MESSAGE({ payload: { message } }))
  }

}
