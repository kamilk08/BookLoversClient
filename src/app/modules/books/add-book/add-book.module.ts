import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddBookRoutingModule } from './add-book-routing.module';
import { AuthModule } from '../../auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AddBookComponent } from './index/add-book.component';
import { addBookStateReducer } from './store';
import { AddBookGuard } from './index/services/add-book.guard';
import { ApiModule } from '../../api/api.module';
import { BooksCommonModule } from '../common/books-common.module';
import { TicketsModule } from '../../tickets/tickets.module';

import * as fromEffects from './module.effects';
import * as fromFacades from './module.facades';

@NgModule({
  declarations: [AddBookComponent],
  imports: [
    CommonModule,
    AddBookRoutingModule,
    ApiModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BooksCommonModule,
    AuthModule,
    TicketsModule,
    StoreModule.forFeature('add-book', addBookStateReducer),
    EffectsModule.forFeature(fromEffects.effects)
  ],
  providers: [
    ...fromFacades.facades,
    ...fromEffects.effects, AddBookGuard]
})
export class AddBookModule { }
