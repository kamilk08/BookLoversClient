import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { addAuthorStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AddAuthorImageComponent } from './index/components/author-image/add-author-image.component';
import { AddAuthorComponent } from './index/add-author.component';;
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [AddAuthorImageComponent, AddAuthorComponent],
  imports: [
    CommonModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('add-author', addAuthorStateReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades
  ],
  entryComponents: [AddAuthorComponent]
})
export class AddAuthorModule { }
