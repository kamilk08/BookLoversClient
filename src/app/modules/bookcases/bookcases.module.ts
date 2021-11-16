import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookcaseRoutingModule } from './routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShelfRecordModule } from './shelf-record/shelf-record.module';
import { BookcaseStatisticsModule } from './bookcase-statistics/bookcase-statistics.module';
import { BookcasePaginationModule } from './bookcase-pagination/bookcase-pagination.module';
import { BookcaseSettingsModule } from './bookcase-settings/bookcase-settings.module';
import { BookcasePreviewModule } from './bookcase-preview/bookcase-preview.module';
import { bookcaseModuleReducer } from './store/index';
import { ApiModule } from '../api/api.module';
import { ReviewsModule } from '../users/reviews/reviews.module';
import { BooksModule } from '../books/books.module';

import * as fromIndex from './index/index';
import * as fromEffects from './store/module.effects'
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [
    ...fromIndex.containers,
    ...fromIndex.components
  ],
  imports: [
    CommonModule,
    ApiModule,
    BookcaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ShelfRecordModule,
    BookcaseStatisticsModule,
    BookcasePaginationModule,
    BookcaseSettingsModule,
    BookcasePreviewModule,
    ReviewsModule,
    BooksModule,
    StoreModule.forFeature('bookcase', bookcaseModuleReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  exports: [
    BookcasePreviewModule
  ],
  providers: [
    ...fromIndex.pageServices,
    ...fromFacades.moduleFacades,
    ...fromEffects.moduleEffects
  ],
  entryComponents: [
    ...fromIndex.entryComponents
  ]
})
export class BookcasesModule { }
