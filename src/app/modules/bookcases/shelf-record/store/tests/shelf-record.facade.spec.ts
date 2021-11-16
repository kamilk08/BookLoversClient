import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ShelfRecord } from "src/app/modules/api/bookcases/shelf-records/models/shelf-record.model";
import { ShelfRecordApi } from "src/app/modules/api/bookcases/shelf-records/shelf-records.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { shelfRecordModuleReducer } from "..";
import { ShelfRecordEffects } from "../shelf-record.effects";
import { ShelfRecordFacade } from "../shelf-record.facade";

describe('SHELF_RECORD_FACADE', () => {

  let facade: ShelfRecordFacade
  let api: ShelfRecordApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('shelfRecords', shelfRecordModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ShelfRecordEffects])
      ],
      providers: [
        ShelfRecordFacade,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(ShelfRecordFacade);
    api = TestBed.get(ShelfRecordApi);
  });

  describe('SELECT_SHELF_RECORD', () => {
    it('should dispatch an action and as a result of which shelfRecord$ observable should emit new value', async (done) => {

      const shelfId = 1;
      const bookId = 1;

      const shelfRecord = new ShelfRecord();
      shelfRecord.id = 1;
      shelfRecord.bookId = bookId;
      shelfRecord.shelfId = shelfId;

      spyOn(api, 'getShelfRecord').and.returnValue(of(shelfRecord))

      facade.selectShelfRecord(shelfId, bookId);

      const subscription = facade.shelfRecord$(shelfId, bookId)
        .subscribe(val => {
          expect(val).toEqual(shelfRecord);
          done();
        });

      subscription.unsubscribe();

    });
  });

  describe('SELECT_MULTIPLE_SHELF_RECORDS', () => {

    it('should dispatch an action and as a result of which multipleShelfRecords$ should emit new value', async (done) => {

      const bookId = 1;
      const bookcaseId = 1;
      const shelfId = 1;

      const shelfRecord = new ShelfRecord();
      shelfRecord.id = 1;
      shelfRecord.bookId = bookId;
      shelfRecord.shelfId = shelfId;

      spyOn(api, 'getMultipleShelfRecords').and.returnValue(of([shelfRecord]))

      facade.selectMutlipleShelfRecords([bookId], bookcaseId);

      const subscription = facade.multipleShelfRecords$(shelfId)
        .subscribe(val => {
          expect(val).toEqual([shelfRecord])
          done();
        });

      subscription.unsubscribe();


    })

  });

});
