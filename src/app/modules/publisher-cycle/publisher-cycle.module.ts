import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PublisherRoutingModule } from '../publisher/routing.module';
import { StoreModule } from '@ngrx/store';
import { publisherCyclesStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '../api/api.module';

import * as fromEffects from '../publisher-cycle/store/module.effects';
import * as fromFacades from '../publisher-cycle/store/module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublisherRoutingModule,
    ApiModule,
    SharedModule,
    StoreModule.forFeature('publisher-cycles', publisherCyclesStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ...fromEffects.moduleEffects,
    ...fromFacades.moduleFacades
  ]
})
export class PublisherCycleModule { }
