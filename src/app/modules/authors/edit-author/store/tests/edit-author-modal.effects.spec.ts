import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { EditAuthorApi } from "src/app/modules/api/authors/edit-author/edit-author.api";
import { editAuthorModuleReducer } from "..";
import * as fromActions from '../edit-author-modal-state/edit-author-modal.actions';
import { EditAuthorModalEffects } from "../edit-author-modal-state/edit-author-modal.effects";
import { EDIT_AUTHOR } from "../edit-author-state/edit-author.actions";
import { EditAuthorFacade } from "../edit-author.facade";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";

describe('Edit author modal effects', () => {
  let effects: EditAuthorModalEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let scheduler: TestScheduler;
  let authService: AuthService;
  let facade: EditAuthorFacade;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('edit-author', editAuthorModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([EditAuthorModalEffects])
      ],
      providers: [
        EditAuthorModalEffects,
        {
          provide: EditAuthorFacade,
          useValue: {
            editedAuthor$: (userId: number) => of(undefined),
            oldAuthor$: of(undefined),
            authorImage$: of(undefined),
            authorBooks$: of([])
          }
        },
        EditAuthorApi,
        AuthService,
        TokenService,
        CookiesService,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(EditAuthorModalEffects);
    authService = TestBed.get(AuthService);
    facade = TestBed.get(EditAuthorFacade);
    scheduler = new TestScheduler((a, e) => {
      expect(a).toEqual(e);
    });
  })

  describe('submitEditAuthorForm$', () => {
    it('should dispatch EDIT_AUTHOR_FORM_VALID action when form is valid', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const dummyForm: any = {
          valid: true
        };

        const action = fromActions.SUBMIT_EDIT_AUTHOR_FORM({ payload: { form: dummyForm } });
        const completion = fromActions.EDIT_AUTHOR_FORM_VALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitEditAuthorForm$)
          .toBe('b', { b: completion });
      });
    });

    it('should dispatch EDIT_AUTHOR_FORM_INVALID action when form is not valid', () => {

      scheduler.run(({ hot, cold, expectObservable }) => {

        const dummyForm: any = {
          valid: false
        };

        const action = fromActions.SUBMIT_EDIT_AUTHOR_FORM({ payload: { form: dummyForm } });
        const completion = fromActions.EDIT_AUTHOR_FORM_INVALID();

        actions$ = hot('a', { a: action });

        expectObservable(effects.submitEditAuthorForm$)
          .toBe('b', { b: completion });
      })
    })
  });

  describe('editAuthorFormValid$', () => {
    it('should dispatch EDIT_AUTHOR action', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = fromActions.EDIT_AUTHOR_FORM_VALID();

        actions$ = hot('a', { a: action });

        const completion = EDIT_AUTHOR({ payload: { oldAuthor: undefined, author: undefined, image: undefined } })

        expectObservable(effects.editAuthorFormValid$)
          .toBe('b', { b: completion });
      })
    })
  })
});
