import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Series } from "src/app/modules/api/series/models/series.model";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { seriesStateReducer } from "../..";
import { SeriesPaginationEffects } from "../series-pagination.effects";
import { SeriesPaginationFacade } from "../series-pagination.facade";

describe('SERIES_PAGINATION_FACADE', () => {

  let facade: SeriesPaginationFacade;
  let api: SeriesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('series', seriesStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([SeriesPaginationEffects])
      ],
      providers: [
        SeriesPaginationEffects,
        SeriesPaginationFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(SeriesPaginationFacade);
    api = TestBed.get(SeriesApi);
  });

  describe('SELECT_SERIES_PAGE', () => {

    it('should dispatch an action and as a result of which pageResult$ observable should emit new value', async (done) => {

      const authorId = 1;
      const series = new Series('name');
      series.setSeriesId(1);

      spyOn(api, 'getSeriesByAuthor').and.returnValue(of({
        series: [series],
        pageResult: {
          items: [series],
          page: 1,
          totalItems: 1,
          pagesCount: 1
        }
      }));

      facade.selectSeriesByAuthor(authorId, DEFAULT_QUERY());

      const subscription = facade.pageResult$
        .subscribe(val => {
          expect(val.items).toEqual([series]);
          done();
        });

      subscription.unsubscribe();

    });

  });

});
