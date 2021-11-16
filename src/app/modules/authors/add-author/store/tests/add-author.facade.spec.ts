import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { delay, tap } from "rxjs/operators";
import { ApiModule } from "src/app/modules/api/api.module";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { addAuthorStateReducer } from "..";
import { AddAuthorFacade } from "../add-author-state/add-author.facade";

describe('add author facade test', () => {
  let facade: AddAuthorFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-author', addAuthorStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([])
      ],
      providers: [
        AddAuthorFacade
      ]
    });

    facade = TestBed.get(AddAuthorFacade);
  })

  describe('addAuthorForm$', () => {
    it('should return initialy default form that is not valid', async (done) => {

      facade.addAuthorForm$
        .subscribe(val => {
          expect(val.valid).toBeFalsy();
          done();
        });

    });

    it('should return updated form after was submited', async (done) => {

      const firstNameValue = 'foo';

      facade.addAuthorForm$
        .pipe(
          tap(val => {
            val.get('firstName').setValue(firstNameValue);

            facade.submitForm(val);
          }),
          delay(1000)
        ).subscribe(val => {

          expect(val.get('firstName').value).toEqual(firstNameValue);
          done()
        })
    });
  });

  describe('authorImage$', () => {
    it('should return undefined when image was not selected', async (done) => {

      facade.setAuthorImage(null);

      facade.authorImage$.subscribe(val => {

        expect(val).toBeNull();
        done();
      });

    });

    it('should reurtn object of type selectedImage with provided image', async (done) => {

      const selectedImage: SelectedImage = {
        encodedImage: 'encodedImage',
        fileName: 'fileName.jpg'
      };

      facade.setAuthorImage(selectedImage);

      facade.authorImage$
        .subscribe(val => {
          expect(val).toEqual(selectedImage);
          done();
        });
    });
  });

})
