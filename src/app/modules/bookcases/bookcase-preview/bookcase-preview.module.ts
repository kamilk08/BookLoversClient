import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { AddToReadedShelfComponent } from './components/add-to-readed-shelf/add-to-readed-shelf.component';
import { PreviewBookcaseShelfComponent } from './components/preview-bookcase-shelf/preview-bookcase-shelf.component';
import { PreviewBookcaseComponent } from './index/preview-bookcase.component';
import { PreviewBookcaseService } from './index/services/preview-bookcase.service';
import { bookcasePreviewReducer } from './store';
import { AddShelfModule } from './add-shelf/add-shelf.module';
import { AddBookToShelfModule } from './add-book-to-shelf/add-book-to-shelf.module';
import { RemoveShelfModule } from './remove-shelf/remove-shelf.module';
import { ChangeShelfModule } from './change-shelf/change-shelf.module';
import { RemoveBookcaseBookModule } from './remove-book/remove-bookcase-book.module';
import { EditShelfModule } from './edit-shelf/edit-shelf.module';
import { EffectsModule } from '@ngrx/effects';
import { ApiModule } from '../../api/api.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [PreviewBookcaseComponent,
    AddToReadedShelfComponent,
    PreviewBookcaseShelfComponent],
  imports: [
    CommonModule,
    ApiModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AddShelfModule,
    AddBookToShelfModule,
    ChangeShelfModule,
    RemoveShelfModule,
    RemoveBookcaseBookModule,
    EditShelfModule,
    SharedModule,
    StoreModule.forFeature('bookcase-preview', bookcasePreviewReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  exports: [PreviewBookcaseComponent, PreviewBookcaseShelfComponent],
  providers: [
    ...fromEffects.effects,
    ...fromFacades.facades, PreviewBookcaseService
  ],
  entryComponents: [
    AddToReadedShelfComponent
  ]
})
export class BookcasePreviewModule {

}
