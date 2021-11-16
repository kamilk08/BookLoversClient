import { TestBed } from "@angular/core/testing"
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AddAuthorModalEffects } from "../add-author-modal-state/add-author-modal.effects";
import { AddAuthorFacade } from "../add-author-state/add-author.facade";

import * as fromActions from '../add-author-modal-state/add-author-modal.actions';
import { TestScheduler } from "rxjs/testing";
import { addAuthorStateReducer } from "..";
import { EffectsModule } from "@ngrx/effects";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model";
import { FullName } from "src/app/modules/shared";
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model";
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";

describe('add author modal effects', () => {
  let form: FormGroup;

  let authorToAdd: Author = new Author(
    new AuthorBasics(new FullName('firstname', 'secondName'), 1),
    new AuthorDescription('about', 'source', 'website'),
    new AuthorDetails(new Date(), new Date(), 'birthPlace', 1),
    []
  );

  let actions$: Observable<Action> = new Observable<Action>();
  let facade: AddAuthorFacade;
  let scheduler: TestScheduler;
  let effects: AddAuthorModalEffects;
  let authService: AuthService;

  beforeEach(() => {
    form = new FormGroup({
      firstName: new FormControl('', Validators.maxLength(128)),
      secondName: new FormControl('', [Validators.maxLength(128), Validators.required]),
      birthDate: new FormControl(null, []),
      deathDate: new FormControl(null, []),
      birthPlace: new FormControl('', [Validators.maxLength(255)]),
      sex: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(3)]),
      about: new FormControl('', [Validators.max(2083)]),
      website: new FormControl('', []),
      descriptionSource: new FormControl('', [Validators.maxLength(255)]),
      categories: new FormControl([]),
      image: new FormControl(null),
    });

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('add-author', addAuthorStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AddAuthorModalEffects])
      ],
      providers: [
        AddAuthorFacade,
        provideMockActions(() => actions$),
        AuthService,
        TokenService,
        CookiesService
      ]
    });

    facade = TestBed.get(AddAuthorFacade);
    effects = TestBed.get(AddAuthorModalEffects);
    authService = TestBed.get(AuthService);

    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    })
  });

  describe('submitAddAuthorForm$', () => {
    it('should dispatch ADD_AUTHOR_FORM_VALID when form is valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        form.get('secondName').patchValue('secondName');
        form.get('sex').patchValue(1);
        form.updateValueAndValidity();

        const action = fromActions.SUBMIT_ADD_AUTHOR_FORM({ payload: { form } })
        const completion = fromActions.ADD_AUTHOR_FORM_VALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitAddAuthorForm$)
          .toBe('b', { b: completion });
      })

    });

    it('should dispatch ADD_AUTHOR_FORM_INVALID when form is not valid', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.SUBMIT_ADD_AUTHOR_FORM({ payload: { form } });
        const completion = fromActions.ADD_AUTHOR_FORM_INVALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitAddAuthorForm$)
          .toBe('b', { b: completion })
      })
    });
  });

})
