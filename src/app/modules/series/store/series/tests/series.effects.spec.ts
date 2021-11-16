import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { SeriesEffects } from "../series.effects";

import * as fromActions from '../series.actions';
import { Series } from "src/app/modules/api/series/models/series.model";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { SeriesState } from "../series.reducer";

describe('SERIES_EFFECTS', () => {

  let api: SeriesApi;
  let effects: SeriesEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        SeriesEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<SeriesState>(),
        provideMockActions(() => actions$)
      ]
    });

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    api = TestBed.get(SeriesApi);
    effects = TestBed.get(SeriesEffects);
  });

  describe('SELECT_SERIES$', () => {
    it('should assign FETCH_SERIES when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const seriesId = 1;

        const series = new Series('series');
        series.setSeriesId(seriesId);

        spyOn(api, 'getSeriesById')
          .and.returnValue(of(series))

        const action = fromActions.SELECT_SERIES({ payload: { id: seriesId } });

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_SERIES({ payload: { series } });

        expectObservable(effects.selectSeries$)
          .toBe('b', { b: completion });
      });
    });

    it('should assign FETCH_SERIES_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {
        const seriesId = 1;

        const series = new Series('series');
        series.setSeriesId(seriesId);

        const action = fromActions.SELECT_SERIES({ payload: { id: seriesId } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getSeriesById').and.returnValue(response as any);

        const completion = fromActions.FETCH_SERIES_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectSeries$).toBe('--b', { b: completion });

      });

    });

  });

  describe('SELECT_MULTIPLE_SERIES$', () => {
    it('should assign SELECT_MULTIPLE_SERIES when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_MULTIPLE_SERIES({ payload: { ids: [id] } });

        spyOn(api, 'getMultipleSeries')
          .and.returnValue(of([]));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_MULTIPLE_SERIES({ payload: { series: [] } });

        expectObservable(effects.selectMultipleSeries$)
          .toBe('b', { b: completion });
      });

    });

    it('should assign FETCH_SERIES_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const id = 1;

        const action = fromActions.SELECT_MULTIPLE_SERIES({ payload: { ids: [id] } });

        actions$ = hot('-a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getMultipleSeries')
          .and.returnValue(response as any);

        const completion = fromActions.FETCH_SERIES_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectMultipleSeries$)
          .toBe('--b', { b: completion });
      });

    });

  });

});
