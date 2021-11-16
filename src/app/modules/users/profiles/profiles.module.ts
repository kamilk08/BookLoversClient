import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AvatarsModule } from '../avatars/avatars.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookcasesModule } from '../../bookcases/bookcases.module';
import { profilesStateReducer } from './store';
import { TimelinesModule } from '../timelines/timelines.module';
import { ProfileViewService } from './index/services/profile-view.service';
import { FavouritesModule } from './favourites/favourites.module';
import { ApiModule } from '../../api/api.module';
import { BooksModule } from '../../books/books.module';
import { ReadersModule } from '../readers/readers.module';
import { ReaderFollowersModule } from '../reader-followers/followers.module';

import * as fromIndex from './index/index';
import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [
    ...fromIndex.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    ApiModule,
    SharedModule,
    BookcasesModule,
    BooksModule,
    ReadersModule,
    FavouritesModule,
    AvatarsModule,
    ReaderFollowersModule,
    TimelinesModule,
    StoreModule.forFeature('profiles', profilesStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ProfileViewService,
    ...fromEffects.moduleEffects,
    ...fromFacades.moduleFacades
  ],
  exports: [],
  entryComponents: [...fromIndex.entryComponents]
})
export class ProfilesModule { }
