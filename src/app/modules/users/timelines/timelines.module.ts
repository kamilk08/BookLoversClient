import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { timeLineStateReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { TimeLinesRoutingModule } from './routing.module';
import { BookcasesModule } from '../../bookcases/bookcases.module';
import { TimeLineViewService } from './index/services/timeline-view.service';
import { FormsModule } from '@angular/forms';
import { TimelineItemDetailsService } from './index/services/timeline-item-details.service';
import { ApiModule } from '../../api/api.module';

import * as fromIndex from '../timelines/index/index';
import * as fromEffects from '../timelines/store/module.effects';
import * as fromFacades from '../timelines/store/module.facades';

@NgModule({
  declarations: [
    ...fromIndex.components
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimeLinesRoutingModule,
    SharedModule,
    BookcasesModule,
    ApiModule,
    StoreModule.forFeature('timelines', timeLineStateReducer),
    EffectsModule.forFeature(fromEffects.moduleEffects)
  ],
  exports: [],
  providers: [
    ...fromEffects.moduleEffects,
    ...fromFacades.facades,
    TimeLineViewService, TimelineItemDetailsService
  ]
})
export class TimelinesModule { }
