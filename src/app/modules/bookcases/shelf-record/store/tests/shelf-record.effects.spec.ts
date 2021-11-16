import { HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { ShelfRecordApi } from "src/app/modules/api/bookcases/shelf-records/shelf-records.api";
import { ShelfRecordEffects } from "../shelf-record.effects";

import * as fromActions from '../shelf-record.actions';
import { ShelfRecord } from "src/app/modules/api/bookcases/shelf-records/models/shelf-record.model";
import { ApiError } from "src/app/modules/api/api-error.model";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { ShelfRecords } from "../shelf-record.reducer";
import { provideMockStore } from "@ngrx/store/testing";

describe('SHELF_RECORD_EFFECTS', () => {

  let effects: ShelfRecordEffects;
  let api: ShelfRecordApi;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule],
      providers: [
        provideMockStore<ShelfRecords>(),
        provideMockActions(() => actions$),
        ShelfRecordEffects,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    effects = TestBed.get(ShelfRecordEffects);
    api = TestBed.get(ShelfRecordApi);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  });

  describe('SELECT_SHELF_RECORD$', () => {
    it('should assign FETCH_SHELF_RECORD action when api call was successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_SHELF_RECORD({ payload: { shelfId: 1, bookId: 1 } });

        let shelfRecord: ShelfRecord = new ShelfRecord();

        spyOn(api, 'getShelfRecord').and.returnValue(of(shelfRecord))

        actions$ = hot('a', { a: action });

        const completion = fromActions.FETCH_SHELF_RECORD({ payload: { shelfRecord } });

        expectObservable(effects.selectShelfRecord$)
          .toBe('b', { b: completion });

      });

    });

    it('should assign FETCH_SHELF_RECORD_FALIURE action when api call was not successfull', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SELECT_SHELF_RECORD({ payload: { shelfId: 1, bookId: 1 } });

        actions$ = hot('a', { a: action });

        const error: ApiError = {
          Title: undefined,
          Status: undefined,
          Errors: [],
          Type: undefined,
          getFirstValidationError: ApiError.prototype.getFirstValidationError
        }

        const response = cold('-#|', {}, new HttpErrorResponse({ error }));

        spyOn(api, 'getShelfRecord').and.returnValue(response as any);

        const completion = fromActions.SHELF_RECORD_ACTION_FALIURE({ payload: { model: error } });

        expectObservable(effects.selectShelfRecord$)
          .toBe('-b', { b: completion });
      });

    });
  });

});
