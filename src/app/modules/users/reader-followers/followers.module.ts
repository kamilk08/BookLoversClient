import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { readerFollowersStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ReaderFollowersRoutingModule } from './followers.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../../api/api.module';

import * as fromIndex from './index/index';
import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';
import { ProfileFacade } from '../profiles/store/profile/profile.facade';

@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    CommonModule,
    SharedModule,
    ApiModule,
    ReaderFollowersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('reader-followers', readerFollowersStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ...fromEffects.moduleEffects,
    ...fromFacades.moduleFacades,
    ProfileFacade
  ],

})
export class ReaderFollowersModule { }
