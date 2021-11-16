import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiModule } from '../api/api.module';
import { SharedModule } from '../shared/shared.module';
import { TicketContentService } from './index/components/ticket-content.service';
import { TicketsPageService } from './index/services/tickets-page.service';
import { TicketsRoutingModule } from './routing.module';
import { ticketsModuleReducer } from './store';
import { ResolveTicketBuilder } from './store/tickets/resolve-ticket.builder';;

import * as fromEffects from './store/module.effects';
import * as fromIndex from './index/index';
import * as fromFacades from './store/module.facades';

@NgModule({
  declarations: [...fromIndex.components],
  imports: [
    TicketsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ApiModule,
    StoreModule.forFeature('tickets', ticketsModuleReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  exports: [],
  providers: [
    ...fromEffects.moduleEffects,
    ...fromFacades.moduleFacades,
    TicketsPageService, TicketContentService,
    ResolveTicketBuilder],
})
export class TicketsModule {

}
