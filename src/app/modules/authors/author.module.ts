import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorRoutingModule } from './routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuotesModule } from '../quotes/quotes.module';
import { AddAuthorModule } from './add-author/add-author.module';
import { EditAuthorModule } from './edit-author/edit-author.module';
import { ApiModule } from '../api/api.module';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';

import * as fromIndex from './index/index';
import * as fromStoreIndex from './store/index';
import * as fromEffects from './store/module.effects';
import * as fromFacades from './store/module.facades';


@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    CommonModule,
    ApiModule,
    AuthorRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AddAuthorModule,
    EditAuthorModule,
    QuotesModule,
    AuthModule,
    StoreModule.forFeature('authors', fromStoreIndex.authorsModuleReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [...fromFacades.moduleFacades, ...fromEffects.moduleEffects],
  entryComponents: [...fromIndex.entryComponents]
})
export class AuthorModule { }
