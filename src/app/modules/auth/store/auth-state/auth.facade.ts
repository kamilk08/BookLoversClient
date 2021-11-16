import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ASSIGN_USER, LOGOUT } from './auth.actions';
import { AuthModuleState } from '..';
import { UUID } from 'angular2-uuid';
import { BLOCK_ACCOUNT } from './block-account/block-account.actions';
import * as fromSelectors from './module.selectors';

@Injectable()
export class AuthFacade {

  public readonly user$ = this.store.select(fromSelectors.authenticatedUser);
  public readonly blockingAccount$ = this.store.select(fromSelectors.blockingAccount);

  constructor(private readonly store: Store<AuthModuleState>) { }

  public loadUser() {
    this.store.dispatch(ASSIGN_USER());
  }

  public logout() {
    this.store.dispatch(LOGOUT())
  }

  public blockAccount(readerGuid: UUID) {
    this.store.dispatch(BLOCK_ACCOUNT({ payload: { readerGuid } }));
  }
}

