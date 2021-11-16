import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RatingsModule } from '../ratings/ratings.module';
import { ratingsOverviewReducer } from './store';;
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    RatingsModule,
    SharedModule,
    StoreModule.forFeature('ratings-overview', ratingsOverviewReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects),

  ],
  providers: [...fromFacades.moduleFacades, ...fromEffects.moduleEffects]
})
export class RatingsOverviewModule { }
