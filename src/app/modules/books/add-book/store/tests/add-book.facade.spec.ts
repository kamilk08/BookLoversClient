import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { take } from "rxjs/operators";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookHashTag } from "src/app/modules/api/books/models";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { SelectedImage } from "src/app/modules/shared/models/selected-image";
import { TicketsFacade } from "src/app/modules/tickets/store/tickets.facade";
import { addBookStateReducer } from "..";
import { AddBookFacade } from "../add-book.facade";
import { NewBookFormEffects } from "../new-book-form.effects";

describe('ADD_BOOK_FACADE', () => {

  let facade: AddBookFacade;
  let form: FormGroup;


  beforeEach(() => {
    form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      authors: new FormControl([], [Validators.required]),
      publisher: new FormControl(null, [Validators.required]),
      published: new FormControl(null, []),
      isbn: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      category: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.maxLength(2083)]),
      descriptionSource: new FormControl('', []),
      series: new FormControl(null),
      seriesPosition: new FormControl('', [Validators.min(1)]),
      publisherCycles: new FormControl([], []),
      hashTags: new FormControl([]),
      language: new FormControl(null, [Validators.min(0), Validators.max(2)]),
      pages: new FormControl(null, [Validators.min(1)]),
      coverSource: new FormControl(''),
      isCoverAdded: new FormControl(false, [Validators.required]),
      coverType: new FormControl(null, [Validators.min(1), Validators.max(3)]),
      cover: new FormControl(null)
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-book', addBookStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([NewBookFormEffects, NewBookFormEffects])
      ],
      providers: [
        AddBookFacade,
        TicketsFacade,
        AuthService,
        TokenService,
        CookiesService
      ]
    });

    facade = TestBed.get(AddBookFacade);
  });

  it('initializeForm should dispatch action and newBookForm$ should emit new value', async (done) => {

    facade.initializeForm();

    let formFromFacade: FormGroup;

    facade.newBookForm$
      .pipe(
        take(1)
      ).subscribe(val => {
        formFromFacade = val;
        expect(formFromFacade).toBeDefined();
        done();
      });
  });

  it('submitForm should dispatch action and newBookFrom$ should emit previously submited form', async (done) => {

    let formFromFacade: FormGroup;

    facade.initializeForm();

    form.get('title').setValue('TITLE');
    form.updateValueAndValidity();

    facade.submitForm(form);

    facade.newBookForm$
      .subscribe(val => {
        formFromFacade = val;
        expect(formFromFacade.get('title').value).toBe('TITLE');
        done();
      });
  });

  it('resetForm should dispatch action and newBookFrom$ should emit new reseted form', async (done) => {
    let formFromFacade: FormGroup;

    facade.initializeForm();

    form.get('title').setValue('TITLE');
    form.updateValueAndValidity();

    facade.submitForm(form);

    facade.resetForm();

    facade.newBookForm$
      .subscribe(val => {
        formFromFacade = val;
        expect(formFromFacade.get('title').value).toBe(null);
        done();
      });

  });

  it('changeCover should dispatch action and newBookFrom$ shoud emit form with updated cover', async (done) => {

    let formFromFacade: FormGroup;

    facade.initializeForm();

    let image: SelectedImage = {
      encodedImage: 'encodedImage',
      fileName: 'fileName'
    };

    facade.changeCover(image);

    facade.newBookForm$
      .subscribe(val => {
        formFromFacade = val;
        expect(formFromFacade.get('cover').value).toBe(image);
        expect(formFromFacade.get('isCoverAdded').value).toBeTruthy();
        done();
      });

  });

  it('addHashTag should dispatch action and newBookForm$ should emit form with updated hastags', async (done) => {

    let formFromFacade: FormGroup;

    facade.initializeForm();

    let hashTag: BookHashTag = {
      hashTagValue: 'foo'
    };

    facade.addHashTag(hashTag);

    facade.newBookForm$
      .subscribe(val => {
        formFromFacade = val;
        const hashTags = formFromFacade.get('hashTags').value as BookHashTag[];
        expect(hashTags.length).toBe(1);
        done();
      })
  });

  it('removeHasTag should dispatch action and newBookForm$ should emit form with updated hashtags', async (done) => {
    let formFromFacade: FormGroup;

    facade.initializeForm();

    let hashTag: BookHashTag = {
      hashTagValue: 'foo'
    };

    facade.addHashTag(hashTag);
    facade.removeHashTag(hashTag);

    facade.newBookForm$
      .subscribe(val => {
        formFromFacade = val;
        const hashTags = formFromFacade.get('hashTags').value as BookHashTag[];
        expect(hashTags.length).toBe(0);
        done();
      })
  });

})
