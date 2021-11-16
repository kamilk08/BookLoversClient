import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from './index';
import * as fromActions from './errors.actions';

@Injectable()
export class ErrorsFacade {

  constructor(private store: Store<fromModule.ErrorsState>) {

  }

  throwInternalServerError(error: any) {
    this.store.dispatch(fromActions.THROW_INTERNAL_SERVER_ERROR({ payload: { error } }))
  }

  throwUnAuthorizedError(error: any) {
    this.store.dispatch(fromActions.THROW_UNAUTHORIZED_ERROR({ payload: { error } }))
  }

  throwForbiddenError(error: any) {
    this.store.dispatch(fromActions.THROW_FORBIDDEN_ERROR({ payload: { error } }))
  }

  throwNotFoundError(error: any) {
    this.store.dispatch(fromActions.THROW_NOT_FOUND_ERROR({ payload: { error } }));
  }

}
