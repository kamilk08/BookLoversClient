import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { SeriesModuleState, seriesStateReducer } from "../..";
import { SeriesFacade } from "../../series/series.facade";
import { AddSeriesEffects } from "../add-series.effects";

import * as fromActions from '../add-series.actions';
import { Series } from "src/app/modules/api/series/models/series.model";
import { AddSeriesResponse } from "src/app/modules/api/series/responses/add-series.response";
import { UUID } from "angular2-uuid";
import { FETCH_SERIES } from "../../series/series.actions";
import { SHOW_FALIURE_MESSAGE, SHOW_SUCCESS_MESSAGE } from "src/app/modules/shared/store/messages/actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";

describe('ADD_SERIES_EFFECTS', () => {

  let effects: AddSeriesEffects;
  let api: SeriesApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let facade: SeriesFacade;

  const seriesInitialState: SeriesModuleState = {
    addSeries: {
      series: undefined,
      processing: false,
      error: undefined
    },
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
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('series', seriesStateReducer, {
          initialState: seriesInitialState
        })

      ],
      providers: [
        AddSeriesEffects,
        SeriesFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockActions(() => actions$),
      ]
    });

    effects = TestBed.get(AddSeriesEffects);
    api = TestBed.get(SeriesApi);
    facade = TestBed.get(SeriesFacade);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('ADD_SERIES$', () => {
    it('should assign ADD_SERIES_SUCCESS action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const response: AddSeriesResponse = {
          seriesId: 1,
          seriesName: 'series',
          seriesGuid: UUID.UUID()
        };

        const series = new Series('series');
        series.setSeriesId(1);

        const action = fromActions.ADD_SERIES({ payload: { series } })

        actions$ = hot('a', { a: action });

        spyOn(api, 'addSeries').and.returnValue(of(response));

        const completion = fromActions.ADD_SERIES_SUCCESS({ payload: { seriesId: response.seriesId } });

        expectObservable(effects.addSeries$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign ADD_SERIES_FALIURE action when api call was a faliure', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const series = new Series('series');
        series.setSeriesId(1);

        const action = fromActions.ADD_SERIES({ payload: { series } })

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'addSeries')
          .and.returnValue(response as any);

        const completion = fromActions.ADD_SERIES_FALIURE({ payload: { model: error } });

        expectObservable(effects.addSeries$).toBe('--b', { b: completion });

      });

    });
  });

  describe('ADD_SERIES_SUCCESS$', () => {

    it('should assign two action FETCH_SERIES and SHOW_SUCCESS_MESSAGE', () => {

      const series = new Series('series');
      series.setSeriesId(1);

      facade.addSeries(series);

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.ADD_SERIES_SUCCESS({ payload: { seriesId: 1 } });

        actions$ = hot('a', { a: action });

        const firstAction = FETCH_SERIES({ payload: { series: series } });
        const secondAction = SHOW_SUCCESS_MESSAGE({ payload: { message: 'Series added successfully.😊' } });

        expectObservable(effects.addSeriesSuccess$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });

      });

    });

  });

});
