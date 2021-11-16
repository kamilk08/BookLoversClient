import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { statisticsStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    SharedModule,
    StoreModule.forFeature('ratings-statistics', statisticsStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [...fromFacades.moduleFacades, ...fromEffects.moduleEffects]
})
export class StatisticsModule { }
