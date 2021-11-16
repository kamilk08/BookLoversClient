import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { AddShelfResponse } from "src/app/modules/api/bookcases/api/responses/add-shelf.response";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { Shelf, Bookcase } from "src/app/modules/bookcases/models";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { AddCustomShelfEffects } from "../add-custom-shelf.effects";
import { AddShelfFacade } from "../add-custom-shelf.facade";
import { addShelfReducer } from "../add-custom-shelf.reducer";

describe('ADD_CUSTOM_SHELF_FACADE', () => {

  let facade: AddShelfFacade;
  let api: BookcaseApi;
  let shelf: Shelf;
  let bookcase: Bookcase;

  shelf = new Shelf(4, 'TEST_SHELF');
  shelf.setShelfId(1);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-shelf', addShelfReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddCustomShelfEffects])
      ],
      providers: [AddShelfFacade,
        AddCustomShelfEffects, ApiErrorAdapter, ErrorActions,
        MesssagesFacade, ErrorsFacade
      ]
    });

    facade = TestBed.get(AddShelfFacade);
    api = TestBed.get(BookcaseApi);
  });

  describe('ADD_CUSTOM_SHELF', () => {
    it('should dispatch an action and as a result of which shelf$ observable should emit new value', async (done) => {

      const shelfResponse: AddShelfResponse = {
        bookcaseGuid: UUID.UUID(),
        shelfGuid: shelf.identification.guid,
        shelfId: shelf.identification.id,
        shelfName: 'shelfName'
      };

      spyOn(api, 'addShelf').and.returnValue(of(shelfResponse))

      facade.addCustomShlef(bookcase, 'TEST_SHELF');

      const subscription = facade.addedShelf$.subscribe(val => {
        expect(val.identification.id).toEqual(shelf.identification.id);
        done();
      });

      subscription.unsubscribe();

    });
  });

})
