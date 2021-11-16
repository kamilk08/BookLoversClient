import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Statistics } from "src/app/modules/api/ratings/statistics/models/statistics";
import { StatisticsApi } from "src/app/modules/api/ratings/statistics/statistics.api";
import { statisticsStateReducer } from "..";
import { AuthorStatisticsEffects } from "../authors/author-statistics.effects";
import { PublisherStatisticsEffects } from "../publisher/publisher-statistics.effects";
import { SeriesStatisticsEffects } from "../series/series-statistics.effects";
import { StatisticsFacade } from "../statistics.facade";

describe('STATISTICS_FACADE', () => {

  let facade: StatisticsFacade;
  let api: StatisticsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('ratings-statistics', statisticsStateReducer),
        EffectsModule.forRoot([AuthorStatisticsEffects, PublisherStatisticsEffects, SeriesStatisticsEffects]),
        EffectsModule.forFeature([])
      ],
      providers: [
        AuthorStatisticsEffects, PublisherStatisticsEffects,
        SeriesStatisticsEffects, StatisticsFacade,
        ApiErrorAdapter
      ]
    });

    facade = TestBed.get(StatisticsFacade);
    api = TestBed.get(StatisticsApi);
  })

  describe('SELECT_AUTHOR_STATISTICS', () => {
    it('should dispatch action and observable should emit new value', async (done) => {

      const authorId = 1;

      const statistics: Statistics = {
        average: 5.00,
        ratingsCount: 10,
        objectId: authorId
      }

      spyOn(api, 'getAuthorStatistics')
        .and.returnValue(of(statistics));

      facade.selectAuthorStatistics(authorId);

      const subscription = facade.authorStatistics$(authorId)
        .subscribe(val => {
          expect(val).toEqual(statistics);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SELECT_SERIES_STATISTICS', () => {
    it('should dispatch action and observable should emit new value', async (done) => {

      const seriesId = 1;

      const statistics: Statistics = {
        average: 5.00,
        ratingsCount: 10,
        objectId: seriesId
      }

      spyOn(api, 'getSeriesStatistics')
        .and.returnValue(of(statistics));

      facade.selectSeriesStatistics(seriesId);

      const subscription = facade.seriesStatistics$(seriesId)
        .subscribe(val => {
          expect(val).toEqual(statistics);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SELECT_PUBLISHER_STATISTICS', () => {
    it('should dispatch action and observable should emit new value', async (done) => {
      const publisherId = 1;

      const statistics: Statistics = {
        average: 5.00,
        ratingsCount: 10,
        objectId: publisherId
      }

      spyOn(api, 'getPublisherStatistics')
        .and.returnValue(of(statistics));

      facade.selectPublisherStatistics(publisherId);

      const subscription = facade.publisherStatistics$(publisherId)
        .subscribe(val => {
          expect(val).toEqual(statistics);
          done();
        });

      subscription.unsubscribe();
    });
  });

});
