import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReadersRoutingModule } from './routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { readersStateReducer } from './store';
import { ReaderStatisticsModule } from '../statistics/statistics.module';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReadersRoutingModule,
    SharedModule,
    ApiModule,
    ReaderStatisticsModule,
    StoreModule.forFeature('readers', readersStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [...fromEffects.moduleEffects, ...fromFacades.moduleFacades],
  entryComponents: []
})
export class ReadersModule { }
