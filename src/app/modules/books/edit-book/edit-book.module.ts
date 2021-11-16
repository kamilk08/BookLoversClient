import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBookRoutingModule } from './edit-book-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthModule } from '../../auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EditBookComponent } from './index/edit-book.component';
import { BookEditGuard } from './index/services/book-edit.guard';
import { editBookModuleReducer } from './store';
import { ApiModule } from '../../api/api.module';
import { BooksCommonModule } from '../common/books-common.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [EditBookComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EditBookRoutingModule,
    ApiModule,
    BooksCommonModule,
    SharedModule,
    AuthModule,
    StoreModule.forFeature('edit-book', editBookModuleReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [...fromEffects.effects, ...fromFacades.facades, BookEditGuard],
  entryComponents: []
})
export class EditBookModule { }
