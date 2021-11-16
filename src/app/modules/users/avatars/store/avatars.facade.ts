import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeAvatar } from '../../../api/avatars/models/change-avatar.model';
import * as fromModule from './avatar.reducer';
import * as fromActions from './avatar.actions';

@Injectable()
export class AvatarsFacade {

  constructor(private readonly store: Store<fromModule.Avatars>) { }

  changeAvatar(model: ChangeAvatar) {
    this.store.dispatch(fromActions.CHANGE_AVATAR({ payload: { model } }));
  }
}
