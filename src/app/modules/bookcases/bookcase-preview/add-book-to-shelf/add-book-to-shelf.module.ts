import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { addBookToBookcaseReducer } from './store/add-book-to-shelf.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from 'src/app/modules/api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacade from './module.facades';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule,
    StoreModule.forFeature('add-book-to-shelf', addBookToBookcaseReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [...fromEffects.effects, ...fromFacade.facades]
})
export class AddBookToShelfModule { }
