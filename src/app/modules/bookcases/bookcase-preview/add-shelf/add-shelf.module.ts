import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { addShelfReducer } from './store/add-custom-shelf.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AddCustomShelfComponent } from './index/add-custom-shelf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AddCustomShelfService } from './index/services/add-custom-shelf.service';
import { ApiModule } from 'src/app/modules/api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [AddCustomShelfComponent],
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('add-shelf', addShelfReducer),
    EffectsModule.forFeature(fromEffects.modules)
  ],
  providers: [
    ...fromEffects.modules,
    ...fromFacades.facades,
    AddCustomShelfService],
  entryComponents: [AddCustomShelfComponent]
})
export class AddShelfModule { }
