import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RatingsModule } from './ratings/ratings.module';
import { RatingsOverviewModule } from './ratings-overview/ratings-overview.module';
import { StatisticsModule } from './statistics/statistics.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RatingsModule,
    StatisticsModule,
    RatingsOverviewModule
  ],
  exports: [
  ],
  providers: [
  ]
})
export class ClassificationModule { }
