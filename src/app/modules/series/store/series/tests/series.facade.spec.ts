import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { Series } from "src/app/modules/api/series/models/series.model";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { BooksPaginationFacade } from "src/app/modules/books/store/pagination/books-pagination.facade";
import { RatingsOverviewFacade } from "src/app/modules/classification/ratings-overview/store/ratings-overview.facade";
import { StatisticsFacade } from "src/app/modules/classification/statistics/store/statistics.facade";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { SEARCH_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { SeriesModuleState, seriesStateReducer } from "../..";
import { AddSeriesEffects } from "../../add-series/add-series.effects";
import { SeriesWebPageEffects } from "../../page/series-web-page.effects";
import { SeriesWebPageFacade } from "../../page/series-web-page.facade";
import { SearchSeriesEffects } from "../../search-series/search-series.effects";
import { SeriesPaginationEffects } from "../../series-pagination/series-pagination.effects";
import { SeriesEffects } from "../series.effects";
import { SeriesFacade } from "../series.facade";

describe('SERIES_FACADE', () => {

  let facade: SeriesFacade;
  let api: SeriesApi;

  const seriesState: SeriesModuleState = {
    addSeries: undefined,
    series: {
      entities: {},
      ids: [],
      processing: false,
      error: undefined
    },
    searchSeries: undefined,
    seriesPagination: undefined,
    booksPagination: undefined,
    pageState: undefined
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('series', seriesStateReducer, { initialState: seriesState }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SearchSeriesEffects, SeriesEffects, AddSeriesEffects,
          SeriesPaginationEffects, SeriesWebPageEffects])
      ],
      providers: [
        SeriesFacade,
        SearchSeriesEffects, SeriesEffects, AddSeriesEffects,
        SeriesPaginationEffects, SeriesWebPageEffects,
        StatisticsFacade,
        SeriesWebPageFacade,
        BooksPaginationFacade,
        RatingsOverviewFacade,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(SeriesFacade);
    api = TestBed.get(SeriesApi);
  });

  describe('SELECT_SINGLE_BY_ID', () => {
    it('should dispatch action and as a result of which seriesById$ observable should emit new value', async (done) => {

      const seriesId = 1;

      const series = new Series('series');
      series.setSeriesId(seriesId);

      spyOn(api, 'getSeriesById')
        .and.returnValue(of(series));

      facade.selectSingleById(seriesId);

      const subscription = facade.seriesById$(seriesId)
        .subscribe(val => {
          expect(val).toEqual(series);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_MULTIPLE', () => {
    it('should dispatch an action and as a result of which multipleSeries$ observable should be emit new value', async (done) => {

      const seriesId = 1;

      const series = new Series('series');
      series.setSeriesId(seriesId);

      spyOn(api, 'getMultipleSeries')
        .and.returnValue(of([series]));

      facade.selectMultiple([seriesId]);

      const subscription = facade.multipleSeries$([seriesId])
        .subscribe(val => {
          expect(val).toEqual([series])
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('FIND_SERIES', () => {
    it('should dispatch an action and as a result of which searchedBookSeries$ should emit new value', async (done) => {

      const seriesId = 1;

      const series = new Series('value');
      series.setSeriesId(seriesId);

      spyOn(api, 'findSeries').and.returnValue(of([series]));

      facade.findSeries(SEARCH_QUERY('value'));

      const subscription = facade.searchedBookSeries$
        .subscribe(val => {
          expect(val).toEqual([series])
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('ADD_SERIES', () => {

    it('should dispatch action and as a result of which addedSeries$ observable should emit new value', async (done) => {

      const seriesId = 1;

      const series = new Series('series');
      series.setSeriesId(seriesId);

      facade.addSeries(series);

      facade.addedSeries$
        .subscribe(val => {
          expect(val).toEqual(series);
          done();
        })

    })

  })

});
