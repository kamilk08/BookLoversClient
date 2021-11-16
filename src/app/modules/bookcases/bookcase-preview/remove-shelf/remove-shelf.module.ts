import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { removeShelfReducer } from './store/remove-shelf.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RemoveCustomShelfComponent } from './index/remove-custom-shelf.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ApiModule } from 'src/app/modules/api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [RemoveCustomShelfComponent],
  imports: [
    CommonModule,
    ApiModule,
    SharedModule,
    StoreModule.forFeature('remove-shelf', removeShelfReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects, ...fromFacades.facades],
  entryComponents: [RemoveCustomShelfComponent]
})
export class RemoveShelfModule { }
