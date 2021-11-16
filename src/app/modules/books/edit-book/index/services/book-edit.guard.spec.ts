import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Router, RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UUID } from "angular2-uuid";
import { of } from "rxjs";
import { Book, BookBasics, BookPublisher } from "src/app/modules/api/books/models";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { CookiesService } from "src/app/modules/auth/services/cookies.service";
import { TokenService } from "src/app/modules/auth/services/token.service";
import { ALL_SUBCATEGORIES } from "../../../common/categories";
import { booksStateReducer } from "../../../store";
import { BookFacade } from "../../../store/book.facade";
import { BookEditGuard } from "./book-edit.guard";

describe('book edit guard', () => {
  let bookId = 1;

  let authService: AuthService;
  let bookFacade: BookFacade;
  let router: Router;
  let book: Book;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]),
      [], new BookPublisher(1, UUID.UUID(), new Date()));
    book.setBookId(bookId);
    book.addedBy = { addedById: 1, addedByGuid: UUID.UUID(), userName: 'username' };

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('books', booksStateReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([]),
        RouterModule.forRoot([])
      ],
      providers: [
        AuthService,
        TokenService,
        CookiesService,
        {
          provide: BookFacade,
          useValue: {
            bookById$: (bookId: number) => of(book)
          }
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } }
        },
      ]
    });

    authService = TestBed.get(AuthService);
    bookFacade = TestBed.get(BookFacade);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute)
  })

  it('canActivate method should return true when user is Librarian', () => {

    spyOnProperty(authService, 'isLibrarian')
      .and.returnValue(true);

    let guard = new BookEditGuard(authService, bookFacade, router);
    let flag = guard.canActivate(activatedRoute.snapshot, undefined);

    expect(flag).toBeTruthy();
  });

  it('canActivate method should return true when book was created by the user', () => {

    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOnProperty(authService, 'isLibrarian')
      .and.returnValue(false);

    spyOnProperty(authService, 'userId').and.returnValue(book.addedBy.addedById);

    let guard = new BookEditGuard(authService, bookFacade, router);
    let flag = guard.canActivate(activatedRoute.snapshot, undefined);

    expect(flag).toBeTruthy();

  });

  it('router navigate method should be triggered when book was not created by selected user', () => {

    let routerSpy = spyOn(router, 'navigate');

    spyOnProperty(authService, 'isLibrarian')
      .and.returnValue(false);

    spyOnProperty(authService, 'userId').and.returnValue(book.addedBy.addedById + 1);

    localStorage.setItem(`edit-book-${book.identification.id}`, JSON.stringify(book));

    let guard = new BookEditGuard(authService, bookFacade, router);

    let flag = guard.canActivate(activatedRoute.snapshot, undefined);

    expect(routerSpy).toHaveBeenCalled();
  })

});
