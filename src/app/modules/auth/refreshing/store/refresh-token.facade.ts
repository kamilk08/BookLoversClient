import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModule from '../index';
import * as fromSelectors from './refresh-token.selectors';
import { REFRESH_TOKEN } from './refresh-token.actions';

@Injectable()
export class RefreshTokenFacade {

  public readonly isRefreshing$ = this.store.select(fromSelectors.isRefreshing);
  public readonly refreshToken$ = this.store.select(fromSelectors.refreshToken);
  public readonly isSuccess$ = this.store.select(fromSelectors.isSuccess);

  constructor(private store: Store<fromModule.RefreshTokenState>) { }

  public refresh(refreshToken: string) {
    this.store.dispatch(REFRESH_TOKEN({ payload: { refreshToken } }))
  }
}
