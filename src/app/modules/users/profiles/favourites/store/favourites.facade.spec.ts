import { HttpClientModule } from "@angular/common/http";
import { fakeAsync, flush, flushMicrotasks, TestBed, tick } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { ApiModule } from "src/app/modules/api/api.module";
import { FavouritesApi } from "src/app/modules/api/profiles/favourites/favourites.api";
import { FavouriteAuthor } from "src/app/modules/api/profiles/favourites/models/favourite-author.model";
import { FavouriteBook } from "src/app/modules/api/profiles/favourites/models/favourite-book.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service";
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade";
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade";
import { favouritesModuleReducer } from ".";
import { ProfileFacade } from "../../store/profile/profile.facade";
import { AddFavouriteEffects } from "./add-favourite/add-favourite.effects";
import { FavouriteAuthorsEffects } from "./favourite-authors/favourite-authors.effects";
import { FavouriteBooksEffects } from "./favourite-books/favourite-books.effects";
import { FavouritesFacade } from "./favourites.facade";
import { RemoveFavouriteEffects } from "./remove-favourite/remove-favourite.effects";

describe('FAVOURITES_FACADE', () => {

  let facade: FavouritesFacade;
  let api: FavouritesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('favourites', favouritesModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([FavouriteAuthorsEffects, FavouriteBooksEffects,
          AddFavouriteEffects, RemoveFavouriteEffects])
      ],
      providers: [
        FavouritesFacade,
        ProfileFacade,
        AuthService,
        TokenService,
        CookiesService,
        ErrorActions,
        ErrorsFacade,
        MesssagesFacade,
        FavouriteAuthorsEffects, FavouriteBooksEffects,
        AddFavouriteEffects, RemoveFavouriteEffects
      ]
    });

    facade = TestBed.get(FavouritesFacade);
    api = TestBed.get(FavouritesApi);
  });

  describe('SELECT_FAVOURITE_AUTHORS', () => {

    it('should dispatch an action and as a result of which favouriteAuthors$ observable should emit new value', fakeAsync(() => {

      const readerId = 1;

      const favouriteAuthor = new FavouriteAuthor(UUID.UUID());

      spyOn(api, 'getFavouriteAuthors').and.returnValue(of([favouriteAuthor]))

      facade.selectFavouriteAuthors(readerId);

      tick(4000);

      const subscription = facade.favouriteAuthors$(readerId)
        .subscribe(val => {
          expect(val).toEqual([favouriteAuthor]);
        });

      subscription.unsubscribe();

      flush();
      flushMicrotasks();
    }));
  });

  describe('SELECT_FAVOURITE_BOOKS', () => {
    it('should dispatch an action and as a result of which favouriteBooks$ observable should emit new value', fakeAsync(() => {

      const readerId = 1;

      const favouriteBook = new FavouriteBook(UUID.UUID());

      spyOn(api, 'getFavouriteBooks').and.returnValue(of([favouriteBook]));

      facade.selectFavouriteBooks(readerId);

      tick(4000);

      const subscription = facade.favouriteBooks$(readerId)
        .subscribe(val => {
          expect(val).toEqual([favouriteBook]);
        });

      subscription.unsubscribe();

      flush();
      flushMicrotasks();
    }));
  })

});
