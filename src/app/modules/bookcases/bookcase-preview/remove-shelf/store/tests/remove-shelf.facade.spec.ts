import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { ApiModule } from "src/app/modules/api/api.module";
import { Bookcase, Shelf } from "src/app/modules/bookcases/models";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { RemoveShelfFacade } from "../remove-shelf.facade";
import { removeShelfReducer } from "../remove-shelf.reducer";

describe('REMOVE_SHELF_FACADE', () => {

  let facade: RemoveShelfFacade;

  let bookcase: Bookcase;
  let shelf: Shelf = new Shelf(CUSTOM_SHELF.id, 'name');
  shelf.setShelfId(1);
  shelf.identification.guid = UUID.UUID();

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(shelf);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('remove-shelf', removeShelfReducer)
      ],
      providers: [
        RemoveShelfFacade
      ]
    });

    facade = TestBed.get(RemoveShelfFacade);
  });

  describe('REMOVE_SHELF', () => {
    it('should dispatch an action and as a result of which shelfToRemove$ observable should emit new value', async (done) => {

      facade.removeShelf(bookcase, shelf);

      const subscription = facade.shelfToRemove$
        .subscribe(val => {
          expect(val.identification.guid).toEqual(shelf.identification.guid)
          done();
        });

      subscription.unsubscribe();
    });
  });

});
