import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reviewsStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ReviewsRoutingModule } from './routing.moduel';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../../api/api.module';

import * as fromIndex from './index/index';
import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    CommonModule,
    FormsModule,
    ReviewsRoutingModule,
    ApiModule,
    SharedModule,
    StoreModule.forFeature('reviews', reviewsStateReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades
  ]
})
export class ReviewsModule { }
