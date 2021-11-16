import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { AuthorModule } from '../authors/author.module';
import { PublisherModule } from '../publisher/publisher.module';
import { PublisherCycleModule } from '../publisher-cycle/publisher-cycle.module';
import { SeriesModule } from '../series/series.module';
import { booksStateReducer } from './store';
import { ApiModule } from '../api/api.module';

import { BookBuilder } from '../api/books/models';
import { BooksCommonModule } from './common/books-common.module';
import { AddBookModule } from './add-book/add-book.module';
import { EditBookModule } from './edit-book/edit-book.module';
import { ReviewsModule } from '../users/reviews/reviews.module';
import { BookcasePreviewModule } from '../bookcases/bookcase-preview/bookcase-preview.module';

import * as fromIndex from './index/index';
import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';


@NgModule({
  declarations: [
    fromIndex.container,
    ...fromIndex.components,
    ...fromIndex.entryComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    ApiModule,
    SharedModule,
    AuthModule,
    AuthorModule,
    PublisherModule,
    PublisherCycleModule,
    SeriesModule,
    BooksCommonModule,
    AddBookModule,
    EditBookModule,
    BookcasePreviewModule,
    ReviewsModule,
    StoreModule.forFeature('books', booksStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  exports: [],
  providers: [
    ...fromFacades.moduleFacades,
    ...fromEffects.moduleEffects,
    ...fromIndex.services,
    BookBuilder
  ],
  entryComponents: [...fromIndex.entryComponents]
})
export class BooksModule { }
