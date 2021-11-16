import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './index/browse/browse.component';
import { BrowseRoutingModule } from './routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { browseModuleReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { BrowseBookCoverComponent } from './index/browse/components/browse-book-cover/browse-book-cover.component';
import { BrowseBookPaginationComponent } from './index/browse/components/browse-book-pagination/browse-book-pagination.component';
import { ApiModule } from '../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [BrowseComponent, BrowseBookCoverComponent, BrowseBookPaginationComponent],
  imports: [
    CommonModule,
    ApiModule,
    BrowseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature('browse', browseModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [...fromEffects.effects, ...fromFacades.facades]
})
export class BrowseModule { }
