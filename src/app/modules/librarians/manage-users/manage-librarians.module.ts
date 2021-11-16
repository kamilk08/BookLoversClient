import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { manageLibrarianModuleReducer } from './store';
import { AddLibrarianRoutingModule } from './routing.module';
import { PromotionWaitersPageService } from './index/services/promotion-waiters.service';
import { ManageUsersPageService } from './index/services/manage-users.service';
import { ManageUsersComponent } from './index/manage-users.component';
import { ManageUsersSearchComponent } from './index/components/manage-users-search/manage-users-search.component';
import { ManageUsersPaginationComponent } from './index/components/manage-users-pagination/manage-users-pagination.component';
import { ApiModule } from '../../api/api.module';
import { ReadersModule } from '../../users/readers/readers.module';
import { ProfilesModule } from '../../users/profiles/profiles.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [ManageUsersComponent, ManageUsersSearchComponent, ManageUsersPaginationComponent],
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AddLibrarianRoutingModule,
    ReadersModule,
    ProfilesModule,
    StoreModule.forFeature('manage-librarian', manageLibrarianModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  exports: [],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades,
    ManageUsersPageService, PromotionWaitersPageService]
})
export class ManageLibrariansModule {

}
