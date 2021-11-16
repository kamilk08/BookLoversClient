import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { quotesStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from '../auth/auth.module';
import { QuoteService } from './quote.service';
import { QuotesRouterModule } from './router.module';
import { ApiModule } from '../api/api.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromIndex from '../quotes/index/index';
import * as fromEffects from '../quotes/store/module.effects';
import * as fromFacades from '../quotes/store/module.facades';

@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    CommonModule,
    QuotesRouterModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    SharedModule,
    AuthModule,
    StoreModule.forFeature('quotes', quotesStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  providers: [
    ...fromFacades.moduleFacades,
    ...fromEffects.moduleEffects, QuoteService]
})
export class QuotesModule { }
