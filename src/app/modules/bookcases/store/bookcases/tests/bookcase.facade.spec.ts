import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { BookcaseApi } from "src/app/modules/api/bookcases/api";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { bookcaseModuleReducer } from "../..";
import { Bookcase } from "../../../models";
import { BookcaseEffects } from "../bookcase.effects";
import { BookcaseFacade } from "../bookcase.facade";

describe('BOOKCASE_FACADE', () => {

  let bookcase: Bookcase;

  bookcase = new Bookcase(1);
  bookcase.identification.id = 1;
  bookcase.identification.guid = UUID.UUID();
  bookcase.userId = 1;

  let facade: BookcaseFacade;
  let authService: AuthService;
  let api: BookcaseApi;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('bookcase', bookcaseModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([BookcaseEffects])
      ],
      providers: [
        BookcaseEffects,
        BookcaseFacade,
        AuthService,
        TokenService,
        CookiesService,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade
      ]
    });

    facade = TestBed.get(BookcaseFacade);
    authService = TestBed.get(AuthService);
    api = TestBed.get(BookcaseApi);
  });

  describe('SELECT_BOOKCASE', () => {
    it('should dispatch an action and as a result of which bookcaseById$ observable should emit new value', async (done) => {

      spyOn(api, 'getBookcaseById').and.returnValue(of(bookcase));

      facade.selectBookcase(bookcase.identification.id);

      const subscription = facade.bookcaseById$(bookcase.identification.id)
        .subscribe(val => {
          expect(val).toEqual(bookcase);
          done();
        });

      subscription.unsubscribe();
    });
  });

  describe('SELECT_CURRENT_USER_BOOKCASE', () => {
    it('should dispatch an action and as a result of which bookcaseByUser$ observable should emit new value', async (done) => {

      spyOnProperty(authService, 'userId').and.returnValue(bookcase.userId);
      spyOn(api, 'getBookcaseByUserId').and.returnValue(of(bookcase));

      facade.selectUserBookcase(bookcase.userId);

      const subscription = facade.bookcaseByUser$(bookcase.userId)
        .subscribe(val => {
          expect(val).toEqual(bookcase);
          done();
        });

      subscription.unsubscribe();
    });
  });


});
