import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { changeShelfReducer } from './store/change-shelf.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChangeShelfComponent } from './index/change-shelf.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ApiModule } from 'src/app/modules/api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [ChangeShelfComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApiModule,
    StoreModule.forFeature('change-shelf', changeShelfReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromFacades.facades,
    ...fromEffects.effects
  ],
  entryComponents: [ChangeShelfComponent]
})
export class ChangeShelfModule { }
