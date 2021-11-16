import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { publishersReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { PublisherRoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';

import * as fromIndex from '../publisher/index';
import * as fromEffects from '../publisher/store/module.effects';
import * as fromFacades from '../publisher/store/module.facades';

@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    CommonModule,
    ApiModule,
    PublisherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('publishers', publishersReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ...fromEffects.moduleEffects,
    ...fromFacades.moduleFacades
  ],
  entryComponents: []
})
export class PublisherModule { }
