import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { refreshTokenModuleReducer } from '.';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature('refresh-token', refreshTokenModuleReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ...fromEffects.moduleEffects,
    ...fromFacades.moduleFacades
  ]
})
export class TokenRefreshingModule { }
