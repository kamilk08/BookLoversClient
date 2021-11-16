import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TestScheduler } from "rxjs/testing";
import { ApiModule } from "src/app/modules/api/api.module";
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model";
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter";
import { AuthModule } from "src/app/modules/auth/auth.module";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { FullName, Sex } from "src/app/modules/shared";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { editAuthorModuleReducer } from "..";
import { EditAuthorModalEffects } from "../edit-author-modal-state/edit-author-modal.effects";
import { EditAuthorEffects } from "../edit-author-state/edit-author.effects";
import { EditAuthorFacade } from "../edit-author.facade"

describe('Edit author facade', () => {

  let facade: EditAuthorFacade;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        AuthModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('edit-author', editAuthorModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([EditAuthorEffects, EditAuthorModalEffects])

      ],
      providers: [
        EditAuthorModalEffects,
        EditAuthorEffects,
        EditAuthorFacade,
        ApiErrorAdapter,
        ErrorActions,
        ErrorsFacade
      ]
    });

    facade = TestBed.get(EditAuthorFacade);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toBe(e);
    })
  });

  describe('setAuthor', () => {
    it('should dispatch SET_AUTHOR_ON_EDIT_AUTHOR_PAGE action and oldAuthor$ should emit new value', () => {

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

      author.identification.id = 1;

      facade.setAuthor(author);

      let authorFromFacade: Author;

      facade.oldAuthor$.subscribe(v => {
        authorFromFacade = v;
      });

      expect(authorFromFacade).toBe(author);

    });
  });

  describe('submitEditAuhtorForm', () => {
    it('should dispatch SUBMIT_EDIT_AUTHOR_FORM and editedAuthor$ should emit new value', () => {

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

      author.identification.id = 1;

      facade.setAuthor(author);

      const form = new FormGroup({
        firstName: new FormControl('firstName', Validators.maxLength(128)),
        secondName: new FormControl('secondNmae', [Validators.maxLength(128), Validators.required]),
        birthDate: new FormControl(new Date(), []),
        deathDate: new FormControl(new Date(), []),
        birthPlace: new FormControl('birthPlace', [Validators.maxLength(255)]),
        sex: new FormControl(Sex.Female.id, [Validators.required, Validators.min(1), Validators.max(3)]),
        about: new FormControl('about', [Validators.max(2083)]),
        website: new FormControl('webiste', []),
        descriptionSource: new FormControl('descriptionSource', [Validators.maxLength(255)]),
        categories: new FormControl([]),
        image: new FormControl(null),
      });
      form.updateValueAndValidity();

      facade.submitEditAuthorForm(form);

      let authorFromFacade: Author;

      facade.editedAuthor$(1)
        .subscribe(v => {
          authorFromFacade = v;
        });

      expect(authorFromFacade).toBeDefined();
    })
  });

  describe('setAuthorImage', () => {
    it('should dispatch SET_AUTHOR_IMAGE action and authorImage$ should emit new value', () => {

      let selectedImage: SelectedImage = {
        encodedImage: '',
        fileName: ''
      };

      facade.setAuthorImage(selectedImage);

      let imageFromFacade: SelectedImage;

      facade.authorImage$
        .subscribe(v => {
          imageFromFacade = v;
        });

      expect(imageFromFacade).toBeDefined();
    })
  })

})
