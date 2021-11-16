import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRoutingModule } from './routing.module';
import { StoreModule } from '@ngrx/store';
import { seriesStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';

import * as fromIndex from './index/index';
import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';


@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ApiModule,
    StoreModule.forFeature('series', seriesStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ...fromFacades.moduleFacades,
    ...fromEffects.moduleEffects
  ]
})
export class SeriesModule { }
