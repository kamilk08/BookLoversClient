import { HttpClientModule } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"
import { UUID } from "angular2-uuid"
import { of } from "rxjs"
import { take } from "rxjs/operators"
import { ApiModule } from "src/app/modules/api/api.module"
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model"
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model"
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model"
import { Author } from "src/app/modules/api/authors/authors/models/author.model"
import { QuoteFrom } from "src/app/modules/api/quotes/models/quote-from.model"
import { Quote } from "src/app/modules/api/quotes/models/quote.model"
import { AuthService } from "src/app/modules/auth/services/auth.service"
import { CookiesService } from "src/app/modules/auth/services/cookies.service"
import { TokenService } from "src/app/modules/auth/services/token.service"
import { StatisticsFacade } from "src/app/modules/classification/statistics/store/statistics.facade"
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service"
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade"
import { QuotesFacade } from "src/app/modules/quotes/store/quotes/quote.facade"
import { SeriesPaginationFacade } from "src/app/modules/series/store/series-pagination/series-pagination.facade"
import { FullName, Sex } from "src/app/modules/shared"
import { DEFAULT_ITEMS_COUNT, Query } from "src/app/modules/shared/common/query"
import { ModalService } from "src/app/modules/shared/services/modal.service"
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade"
import { authorsModuleReducer } from "../.."
import { FollowAuthorEffects } from "../../author-followers/follow-author/follow-author.effects"
import { UnFollowAuthorEffects } from "../../author-followers/unfollow-author/unfollow-author.effects"
import { AuthorEffects } from "../../authors/author.effects"
import { AuthorFacade } from "../../authors/author.facade"
import { RemoveAuthorEffects } from "../../remove-author/remove-author.effects"
import { SearchAuthorEffects } from "../../search-authors/search-author.effects"
import { AuthorWebPageEffects } from "../author-web-page.effects"
import { AuthorWebPageFacade } from "../author-web-page.facade"


export class FakeModalService {

  constructor() {
  }

  withTitle(title: string) {
    return this;
  }

  withWidth(width: string) {
    return this;
  }

  withContent(component: any) {
    return this;
  }

  withFooter(component: any) {
    return this;
  }

  withoutFooter() {
    return this;
  }

  withParams(params: any) {
    return this;
  }

  isCloseable(flag: boolean) {
    return this;
  }


  openModal() {
  }

}

export class FakeAuthorFacade {
  public readonly authorById$ = (authorId: number) => of(this.author);

  private author: Author;

  setAuthor(author: Author) {
    this.author = author;
  }


  selectSingle(authorId: number) {

  }

  selectByGuid(authorGuid: UUID) {

  }

  selectAuthorBooks(authorId: number, query: Query) {

  }

  selectMultipleAuthorsById(authorIds: number[]) {

  }

  selectMultipleAuthorsByGuid(guids: UUID[]) {

  }

  findAuthor(query: Query) {

  }

  followAuthor(author: Author, userId: number) {

  }

  unFollowAuthor(author: Author, userId: number) {

  }

  removeAuthor(author: Author) {

  }

  clearSearchResults() {
  }
}

describe('author web page facade', () => {

  let facade: AuthorWebPageFacade;
  let effects: AuthorWebPageEffects;
  let quotesFacade: QuotesFacade;
  let author: Author;
  let fakeAuthorsFacade = new FakeAuthorFacade();


  beforeEach(() => {
    const authorId = 1;
    const userId = 1;

    author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
      new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

    author.identification.id = authorId;

    fakeAuthorsFacade.setAuthor(author);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AuthorEffects, SearchAuthorEffects, UnFollowAuthorEffects,
          FollowAuthorEffects, AuthorWebPageEffects, RemoveAuthorEffects])

      ],
      providers: [
        AuthService,
        TokenService,
        CookiesService,
        AuthorWebPageFacade,
        SeriesPaginationFacade,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade,
        {
          provide: AuthorFacade,
          useValue: fakeAuthorsFacade
        },
        StatisticsFacade,
        QuotesFacade,
        {
          provide: ModalService,
          useValue: FakeModalService
        }
      ]
    });


    facade = TestBed.get(AuthorWebPageFacade);
    quotesFacade = TestBed.get(QuotesFacade);
    facade.setBooksCount(DEFAULT_ITEMS_COUNT);
    facade.setQuotesCount(DEFAULT_ITEMS_COUNT);
    facade.setSeriesCount(DEFAULT_ITEMS_COUNT);
    effects = TestBed.get(AuthorWebPageEffects);
  });

  describe('setAuthorId', () => {
    it('it should dispatch an action and authorId$ observable should emit new value', () => {

      const authorId = 1;

      facade.setAuthorId(authorId);

      let idFromFacade: number = undefined;

      const subscription = facade.authorId$
        .pipe(
          take(1)
        ).subscribe(v => {
          idFromFacade = v;
        });

      expect(idFromFacade).toBe(1);

      subscription.unsubscribe();

    });
  });

  describe('setQuotesCount', () => {
    it('it should dispatch an action and maxQuotesCount$ should emit new value', () => {

      const quotesCount = 250;

      facade.setQuotesCount(quotesCount);

      let quotesFromFacade: number = undefined;

      facade.maxQuotesCount$
        .subscribe(val => {
          quotesFromFacade = val;
        });

      expect(quotesFromFacade).toBe(quotesCount);
    });
  });

  describe('setBooksCount', () => {
    it('should dispatch an action and maxBooksCount$ should emit new value', () => {

      const booksCount = 250;
      facade.setBooksCount(booksCount);

      let booksFromFacade: number = undefined;

      facade.maxBooksCount$.subscribe(v => booksFromFacade = v);

      expect(booksFromFacade).toBe(booksCount);

    })
  });

  describe('setSeriesCount', () => {
    it('should dispatch an action and maxSeriesCount$ should emit new value', () => {

      const seriesCount = 250;
      facade.setSeriesCount(seriesCount);

      let seriesFromFacade: number = undefined;

      facade.maxSeriesCount$.subscribe(v => seriesFromFacade = v);

      expect(seriesFromFacade).toBe(seriesCount);

    });
  });

  describe('addOrRemoveQuoteLike', () => {
    it('should call likeQuote on quotes facade when quotes does not have a like', () => {

      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(), 1), { id: 1, guid: UUID.UUID() });

      spyOn(quote, 'isLikedBy').and.returnValue(false);
      spyOn(quotesFacade, 'likeQuote');

      facade.addOrRemoveQuoteLike(quote);

      expect(quotesFacade.likeQuote).toHaveBeenCalled();
    });

    it('should call unLikeQuote on quotes facade when quotes has a like', () => {
      const quote = new Quote('quote', new QuoteFrom(UUID.UUID(), 1), { id: 1, guid: UUID.UUID() });

      spyOn(quote, 'isLikedBy').and.returnValue(true);
      spyOn(quotesFacade, 'unLikeQuote');

      facade.addOrRemoveQuoteLike(quote);

      expect(quotesFacade.unLikeQuote).toHaveBeenCalled();
    })
  });

  describe('searchAuthorBooks', () => {
    it('should dispatch action and searchPhrase$ should emit new value', () => {

      const phrase = 'phrase';

      facade.searchAuthorBooks(phrase);

      let phraseFromFacade: string;

      facade.searchPhrase$.subscribe(val => phraseFromFacade = val);

      expect(phraseFromFacade).toBe(phrase);
    });
  });

})
