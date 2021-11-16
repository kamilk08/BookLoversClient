import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { removeBookcaseBookReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from 'src/app/modules/api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature('remove-bookcase-book', removeBookcaseBookReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects, ...fromFacades.facades]
})
export class RemoveBookcaseBookModule { }
