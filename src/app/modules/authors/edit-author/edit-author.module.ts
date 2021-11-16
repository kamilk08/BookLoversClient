import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EditAuthorComponent } from './index/edit-author.component';
import { EditAuthorImageComponent } from './index/components/edit-author-image.component';
import { editAuthorModuleReducer } from './store';
import { ApiModule } from '../../api/api.module';
import { AuthModule } from '../../auth/auth.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [EditAuthorComponent, EditAuthorImageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    SharedModule,
    AuthModule,
    StoreModule.forFeature('edit-author', editAuthorModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades
    ],
  entryComponents: [EditAuthorComponent]
})
export class EditAuthorModule { }
