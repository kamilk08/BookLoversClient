import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SELECT_PROFILE } from './profile.actions';
import { Profile } from '../../../../api/profiles/models/profile.model';
import { CHANGE_PROFILE } from '../change-profile/change-profile.actions';
import * as fromModule from '../index';
import * as fromSelectors from '../module.selectors';



@Injectable()
export class ProfileFacade {

  public readonly error$ = this.store.select(fromSelectors.error);

  public readonly profile$ = (id: number) => this.store.select(fromSelectors.profileById(id));
  public readonly profileByUserId$ = (userId: number) => this.store.select(fromSelectors.profileByUserId(userId));

  public readonly city$ = (userId: number) => this.store.select(fromSelectors.city(userId));
  public readonly sex$ = (userId: number) => this.store.select(fromSelectors.sex(userId));

  public readonly changedProfile$ = this.store.select(fromSelectors.currentProfile$);
  public readonly processing$ = this.store.select(fromSelectors.processing$);

  constructor(private store: Store<fromModule.ProfilesModuleState>) { }

  public selectProfile(userId: number) {
    this.store.dispatch(SELECT_PROFILE({ payload: { userId } }));
  }

  public editProfile(profile: Profile) {
    this.store.dispatch(CHANGE_PROFILE({ payload: { profile } }));
  }

}
