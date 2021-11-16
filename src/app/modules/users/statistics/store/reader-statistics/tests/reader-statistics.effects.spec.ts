import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApiError } from 'src/app/modules/api/api-error.model';
import { ApiModule } from 'src/app/modules/api/api.module';
import { ApiErrorAdapter } from 'src/app/modules/api/error-adapter';
import { ReaderStatistics } from 'src/app/modules/api/statistics/models/reader-statistics.model';
import { ReaderStatisticsApi } from 'src/app/modules/api/statistics/statistics.api';
import * as fromActions from '../reader-statistics.actions';
import { ReaderStatisticsEffects } from '../reader-statistics.effects';

describe('READER_STATISTICS_EFFECTS', () => {

  let effects: ReaderStatisticsEffects;
  let api: ReaderStatisticsApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule

      ],
      providers: [
        ApiErrorAdapter,
        ReaderStatisticsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ReaderStatisticsEffects);
    api = TestBed.get(ReaderStatisticsApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  })


  describe('SELECT_READER_STATISTICS$', () => {
    it('should assign FETCH_READER_STATISTICS when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_READER_STATISTICS({ payload: { readerId } });

        const statistics: ReaderStatistics = new ReaderStatistics();

        spyOn(api, 'getReaderStatistics').and.returnValue(of(statistics));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_READER_STATISTICS({ payload: { statistics } });

        expectObservable(effects.selectReaderStatistics$)
          .toBe('b', { b: completion });
      })

    });

    it('should assign FETCH_READER_STATISTICS when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const readerId = 1;

        const action = fromActions.SELECT_READER_STATISTICS({ payload: { readerId } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getReaderStatistics').and.returnValue(response as any);

        const completion = fromActions.FETCH_READER_STATISTICS_FALIURE({ payload: { error } });

        expectObservable(effects.selectReaderStatistics$)
          .toBe('-b', { b: completion });
      });

    })
  });

});
