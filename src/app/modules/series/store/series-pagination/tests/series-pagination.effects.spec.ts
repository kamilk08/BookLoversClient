import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { SeriesApi } from "src/app/modules/api/series/series.api";
import { SeriesPaginationEffects } from "../series-pagination.effects";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { of } from "rxjs";
import { FETCH_MULTIPLE_SERIES, FETCH_SERIES_FALIURE } from "../../series/series.actions";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { SeriesPaginationState } from "../series-pagination.reducer";

import * as fromActions from '../series-pagination.actions';

describe('SERIES_PAGINATION_EFFECTS', () => {

  let effects: SeriesPaginationEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let api: SeriesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        SeriesPaginationEffects,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        provideMockStore<SeriesPaginationState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SeriesPaginationEffects);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
    api = TestBed.get(SeriesApi);
  });

  describe('SELECT_SERIES_BY_AUTHORS$', () => {

    it('should assign two actions FETCH_MULTIPLE_SERIES and SET_SERIES_PAGE actions when api call was successfull', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const authorId = 1;

        const action = fromActions.SELECT_SERIES_BY_AUTHOR({ payload: { authorId, query: DEFAULT_QUERY() } })

        spyOn(api, 'getSeriesByAuthor')
          .and.returnValue(of({
            series: [],
            pageResult: {
              items: [],
              page: 0,
              totalItems: 0,
              pagesCount: 0
            }
          }));

        actions$ = hot('a', { a: action });

        const secondAction = fromActions.SET_SERIES_PAGE({
          payload: {
            series: [], pageResult: {
              items: [],
              page: 0,
              totalItems: 0,
              pagesCount: 0
            }
          }
        });

        const firstAction = FETCH_MULTIPLE_SERIES({ payload: { series: [] } });

        expectObservable(effects.selectSeriesByAuthor$)
          .toBe('(bc)', {
            b: firstAction,
            c: secondAction
          });


      })

    });

    it('should assign FETCH_SERIES_FALIURE when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const authorId = 1;

        const action = fromActions.SELECT_SERIES_BY_AUTHOR({ payload: { authorId, query: DEFAULT_QUERY() } })

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getSeriesByAuthor')
          .and.returnValue(response as any);

        const completion = FETCH_SERIES_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectSeriesByAuthor$)
          .toBe('-b', { b: completion });
      })

    });

  });

});
