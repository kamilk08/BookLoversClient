import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { bookcaseStatisticsModuleReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    SharedModule,
    StoreModule.forFeature('bookcase-statistics', bookcaseStatisticsModuleReducer),
    EffectsModule.forFeature(fromEffects.effects),

  ],
  providers: [...fromEffects.effects, ...fromFacades.facades]
})
export class BookcaseStatisticsModule { }
