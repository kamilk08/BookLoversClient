import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { bookcasePaginationModuleReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacade from './module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    SharedModule,
    StoreModule.forFeature('bookcase-collection', bookcasePaginationModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [...fromEffects.effects, ...fromFacade.facades]
})
export class BookcasePaginationModule { }
