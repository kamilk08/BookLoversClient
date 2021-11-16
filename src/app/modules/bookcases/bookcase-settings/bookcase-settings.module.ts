import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { bookcaseSettingsModuleReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { PreviewBookcaseSettingsComponent } from './index/preview-bookcase-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CustomShelfComponent } from './index/components/custom-shelf.component';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';


@NgModule({
  declarations: [PreviewBookcaseSettingsComponent, CustomShelfComponent],
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('bookcase-settings', bookcaseSettingsModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [...fromEffects.effects,
  ...fromFacades.facades

  ],
  entryComponents: [PreviewBookcaseSettingsComponent]
})
export class BookcaseSettingsModule { }
