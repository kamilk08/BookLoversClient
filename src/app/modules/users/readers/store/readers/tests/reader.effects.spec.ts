import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ReadersApi } from "src/app/modules/api/readers/readers.api";
import { ReaderEffects } from "../reader.effects";

import * as fromActions from '../reader.actions';
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { UUID } from "angular2-uuid";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { provideMockStore } from "@ngrx/store/testing";
import { ReadersState } from "../reader.reducer";

describe('READER_EFFECTS', () => {

  let effects: ReaderEffects;
  let api: ReadersApi;
  let scheduler: TestScheduler;
  let actions$: Observable<Action> = new Observable<Action>();

  let reader = new Reader(new ReaderDetails('userName', 'role', new Date()), 1);
  reader.identification.id = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule
      ],
      providers: [
        ApiErrorAdapter,
        ReaderEffects,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        provideMockStore<ReadersState>(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ReaderEffects);
    api = TestBed.get(ReadersApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_READER$', () => {
    it('when api call was successfull then FETCH_READER action should be assign', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_READER({ payload: { readerId: reader.identification.id } });

        spyOn(api, 'getReader').and.returnValue(of(reader));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_READER({ payload: { reader } });

        expectObservable(effects.selectReader$)
          .toBe('b', { b: completion });
      });
    });

    it('when api call was not successfull then FETCH_READER_FALIURE when api call should not be successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_READER({ payload: { readerId: reader.identification.id } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getReader').and.returnValue(response as any);

        const completion = fromActions.FETCH_READER_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectReader$)
          .toBe('-b', { b: completion });
      });

    })
  });

  describe('SELECT_READER_BY_GUID$', () => {
    it('should assign FETCH_READER action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const guid: UUID = UUID.UUID();

        const action = fromActions.SELECT_READER_BY_GUID({ payload: { guid } });

        spyOn(api, 'getReaderByGuid').and.returnValue(of(reader));

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_READER({ payload: { reader } });

        expectObservable(effects.selectReaderByGuid$).toBe('b', { b: completion });
      });

    });

    it('should assign FETCH_READER_FALIURE action when api was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const guid: UUID = UUID.UUID();

        const action = fromActions.SELECT_READER_BY_GUID({ payload: { guid } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getReaderByGuid').and.returnValue(response as any);

        const completion = fromActions.FETCH_READER_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectReaderByGuid$)
          .toBe('-b', { b: completion });
      });

    })
  });

});
