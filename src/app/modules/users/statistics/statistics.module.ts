import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { readerModuleStatisticsReducer } from './store';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature('reader-statistics', readerModuleStatisticsReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [...fromEffects.moduleEffects, ...fromFacades.moduleFacades]
})
export class ReaderStatisticsModule { }
