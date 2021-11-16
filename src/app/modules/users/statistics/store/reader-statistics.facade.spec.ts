import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReaderRatings } from "src/app/modules/api/statistics/models/reader-ratings-statistics.model";
import { ReaderStatistics } from "src/app/modules/api/statistics/models/reader-statistics.model";
import { ReaderStatisticsApi } from "src/app/modules/api/statistics/statistics.api";
import { readerModuleStatisticsReducer } from ".";
import { ReaderRatingsStatisticsEffects } from "./ratings-statistics/ratings-statistics.effects";
import { ReaderStatisticsFacade } from "./reader-statistics.facade";
import { ReaderStatisticsEffects } from "./reader-statistics/reader-statistics.effects";

describe('READER_STATISTICS_FACADE', () => {

  let facade: ReaderStatisticsFacade;
  let api: ReaderStatisticsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('reader-statistics', readerModuleStatisticsReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ReaderRatingsStatisticsEffects, ReaderStatisticsEffects])
      ],
      providers: [
        ReaderStatisticsFacade,
        ReaderRatingsStatisticsEffects, ReaderStatisticsEffects
      ]
    });

    facade = TestBed.get(ReaderStatisticsFacade);
    api = TestBed.get(ReaderStatisticsApi);
  });

  describe('SELECT_READER_STATISTICS', () => {
    it('should dispatch an action and as a result of which readerStatistics$ observable should emit new value', async (done) => {

      const readerId = 1;

      const statistics: ReaderStatistics = new ReaderStatistics();
      statistics.readerId = readerId;

      spyOn(api, 'getReaderStatistics').and.returnValue(of(statistics));

      facade.selectReaderStatistics(readerId);

      const subscription = facade.readerStatistics$(readerId)
        .subscribe(val => {
          expect(val).toEqual(statistics)
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SELECT_READER_RATINGS_STATISTICS', () => {
    it('should dispatch an action and as a result of which readerRatingsStatistics$ observable should emit new value', async (done) => {

      const readerId = 1;

      const ratings: ReaderRatings = new ReaderRatings();
      ratings.readerId = readerId;
      ratings.ratingsCount = 1;
      ratings.groupedRatings = { 1: 1 };

      spyOn(api, 'getReaderRatingsStatistics').and.returnValue(of(ratings));

      facade.selectReaderRatingsStatistics(readerId);

      const subscription = facade.readerRatingsStatistics$(readerId)
        .subscribe(val => {
          expect(val).toEqual(ratings);
          done();
        });

      subscription.unsubscribe();

    });
  });

});
