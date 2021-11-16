import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ApiModule } from "src/app/modules/api/api.module";
import { Shelf, Bookcase } from "src/app/modules/bookcases/models";
import { CUSTOM_SHELF } from "src/app/modules/bookcases/models/shelf-categories";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { EditShelfEffects } from "../edit-shelf.effects";
import { EditShelfFacade } from "../edit-shelf.facade";
import { editShelfReducer } from "../edit-shelf.reducer";

describe('EDIT_SHELF_FACADE', () => {

  let facade: EditShelfFacade;

  let shelfName = 'SHELF_NAME';
  let editedShelf = new Shelf(CUSTOM_SHELF.id, 'SHELF');
  editedShelf.setShelfId(1);

  let bookcase: Bookcase;

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();

  bookcase.addShelf(editedShelf);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('edit-shelf', editShelfReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([EditShelfEffects])
      ],
      providers: [
        EditShelfEffects,
        EditShelfFacade,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(EditShelfFacade);
  });

  describe('EDIT_SHELF_NAME', () => {

    it('should dispatch an action and as a result of which editedShelf$ and shelfName$ should emit new values$', async (done) => {

      facade.editShelfName(bookcase, editedShelf, shelfName);

      const susbcription = combineLatest(facade.editedShelf$, facade.shelfName$)
        .pipe(
          map(stream => { return { editedShelf: stream[0], shelfName: stream[1] } })
        ).subscribe(val => {
          expect(val.shelfName).toEqual(shelfName);
          expect(val.editedShelf.identification.guid).toEqual(editedShelf.identification.guid);
          done();
        });

      susbcription.unsubscribe();

    });

  });

});
