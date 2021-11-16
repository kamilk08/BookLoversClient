import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { ReaderDetails } from "src/app/modules/api/readers/models/reader-details.model";
import { Reader } from "src/app/modules/api/readers/models/reader.model";
import { ReadersApi } from "src/app/modules/api/readers/readers.api";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { PageResult } from "src/app/modules/shared/common/page-result";
import { DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { readersStateReducer } from "../..";
import { SearchReaderEffects } from "../../search-readers/search-reader.effects";
import { ReaderEffects } from "../reader.effects";
import { ReadersFacade } from "../reader.facade";

describe('READER_FACADE', () => {

  let reader = new Reader(new ReaderDetails('userName', 'role', new Date()), 1);
  reader.identification.id = 1;
  reader.identification.guid = UUID.UUID();

  let facade: ReadersFacade;
  let api: ReadersApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('readers', readersStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ReaderEffects, SearchReaderEffects])
      ],
      providers: [
        ApiErrorAdapter,
        ReadersFacade,
        ReaderEffects,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    api = TestBed.get(ReadersApi);
    facade = TestBed.get(ReadersFacade);
  });

  describe('SELECT_READER', () => {
    it('should dispatch an action and as a result of which reader$ observable should emit new value', async (done) => {

      spyOn(api, 'getReader').and.returnValue(of(reader));

      facade.selectReader(reader.identification.id);

      const subscription = facade.reader$(reader.identification.id)
        .subscribe(val => {
          expect(val).toEqual(reader);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_READER_BY_GUID', () => {
    it('should dispatch an action and as a result of which readerByGuid$ observable should emit new value', async (done) => {

      spyOn(api, 'getReaderByGuid').and.returnValue(of(reader));

      facade.selectReaderByGuid(reader.identification.guid);

      const subscription = facade.readerByGuid$(reader.identification.guid)
        .subscribe(val => {
          expect(val).toEqual(reader);
          done()
        });

      subscription.unsubscribe();

    });
  });

  describe('SEARCH_READERS_PAGE', () => {
    it('should dispatch an action and as a result of which searchRedersPage$ should emit new value', async (done) => {

      const items = [reader];
      let pageResult: PageResult = {
        items: items,
        page: 0,
        pagesCount: 1,
        totalItems: 1
      }

      spyOn(api, 'searchReaders')
        .and.returnValue(of({ readers: items, pageResult }));

      facade.searchReaders(DEFAULT_QUERY());

      const subscription = facade.searchReadersPage$.subscribe(val => {
        expect(val).toEqual(pageResult)
        done();
      });

      subscription.unsubscribe();
    });

  });

});
