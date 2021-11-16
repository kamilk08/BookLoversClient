import { TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { NewBookFormEffects } from "../new-book-form.effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { provideMockActions } from "@ngrx/effects/testing";
import { TicketsFacade } from "src/app/modules/tickets/store/tickets.facade";
import { AddBookFacade } from "../add-book.facade";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model";
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model";
import { FullName, Sex } from "src/app/modules/shared";
import { Publisher } from "src/app/modules/api/publishers/models/publisher.model";
import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";

import * as fromActions from '../new-book-form.actions';
import { ALL_SUBCATEGORIES } from "../../../common/categories";
import { BOOK_LANGUAGES } from "../../../common/languages";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";

describe('NEW_BOOK_FORM_EFFECTS', () => {

  let effects: NewBookFormEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let form: FormGroup;
  let scheduler: TestScheduler;

  let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
    new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', 1), []);

  author.identification.id = 1;

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
    })

    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        AuthService,
        TokenService,
        CookiesService,
        TicketsFacade,
        {
          provide: AddBookFacade,
          useValue: {
            newBookForm$: of(form)
          }
        },
        NewBookFormEffects
      ]
    });

    effects = TestBed.get(NewBookFormEffects);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })

  });

  describe('SUBMIT_FORM$', () => {
    it('should dispatch BOOK_FORM_VALID when submited form is valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        let publisher: Publisher = new Publisher('publisher');
        publisher.setPublisherId(1);

        form.get('title').setValue('title');
        form.get('authors').setValue([author]);
        form.get('publisher').setValue(publisher);
        form.get('isbn').setValue('12345');
        form.get('category').setValue(ALL_SUBCATEGORIES[0].id);
        form.get('language').setValue(BOOK_LANGUAGES[0])

        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_BOOK_FORM({ payload: { form } });

        const completion = fromActions.BOOK_FORM_VALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitForm$)
          .toBe('b', { b: completion });
      });
    });

    it('should dispatch BOOK_FORM_INVALID when submited form is not valid', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SUBMIT_BOOK_FORM({ payload: { form } });

        const completion = fromActions.BOOK_FORM_INVALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitForm$)
          .toBe('b', { b: completion });
      })

    });
  });


});
