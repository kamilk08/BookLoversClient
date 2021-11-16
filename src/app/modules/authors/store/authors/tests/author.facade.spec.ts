import { HttpClientModule } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { EffectsModule } from "@ngrx/effects"
import { StoreModule } from "@ngrx/store"
import { of } from "rxjs"
import { ApiModule } from "src/app/modules/api/api.module"
import { AuthorFollowersApi } from "src/app/modules/api/authors/author-followers/author-followers.api"
import { AuthorApi } from "src/app/modules/api/authors/authors/author.api"
import { AuthorBasics } from "src/app/modules/api/authors/authors/models/author-basics.model"
import { AuthorDescription } from "src/app/modules/api/authors/authors/models/author-description.model"
import { AuthorDetails } from "src/app/modules/api/authors/authors/models/author-details.model"
import { Author } from "src/app/modules/api/authors/authors/models/author.model"
import { ApiErrorAdapter } from "src/app/modules/api/error-adapter"
import { ErrorActions } from "src/app/modules/errors/services/error-actions.service"
import { ErrorsFacade } from "src/app/modules/errors/store/errors.facade"
import { FullName, Sex } from "src/app/modules/shared"
import { MesssagesFacade } from "src/app/modules/shared/store/messages/message.facade"
import { authorsModuleReducer } from "../.."
import { AuthorEffects } from "../author.effects"
import { AuthorFacade } from "../author.facade"

describe('author facade tests', () => {

  let facade: AuthorFacade;
  let api: AuthorApi;
  let followersApi: AuthorFollowersApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorEffects,
        AuthorFacade,
        ApiErrorAdapter,
        ErrorActions,
        MesssagesFacade,
        ErrorsFacade
      ],
      imports: [
        HttpClientModule,
        ApiModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('authors', authorsModuleReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([AuthorEffects])

      ]
    });

    facade = TestBed.get(AuthorFacade);
    api = TestBed.get(AuthorApi);
    followersApi = TestBed.get(AuthorFollowersApi);
  });

  describe('selectSingle', () => {
    it('should sent SELECT_AUTHOR action and authorById$ should emit new value', () => {

      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      spyOn(api, 'getAuthorById').and.returnValue(of(author));

      let authorFromFacade: Author;

      facade.selectSingle(authorId);

      const subscription = facade.authorById$(authorId)
        .subscribe(author => authorFromFacade = author);

      expect(authorFromFacade).toBe(author);

      subscription.unsubscribe();
    });
  })

  describe('selectMultipleAuthorsById', () => {
    it('should sent SELECT_MULTIPLE_AUTHORS_BY_ID and multipleAuthors$ should emit new value', () => {

      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      let authors = [];
      spyOn(api, 'getMultipleAuthorsById')
        .and.returnValue(of([author]));

      facade.selectMultipleAuthorsById([authorId]);

      const subscription = facade.multipleAuthors$([authorId])
        .subscribe(v => authors = v);

      expect(authors).toEqual([author]);

      subscription.unsubscribe();

    })
  });

  describe('followAuthor', () => {
    it('should dispatch FOLLOW_AUTHOR action and there should an author with follower with given id', () => {


      const authorId = 1;
      const userId = 1;

      let author = new Author(new AuthorBasics(new FullName('firstName', 'secondname'), Sex.Female.id),
        new AuthorDescription('', '', ''), new AuthorDetails(new Date(), new Date(), '', userId), []);

      author.identification.id = authorId;

      spyOn(api, 'getAuthorById').and.returnValue(of(author));

      facade.selectSingle(authorId);

      spyOn(followersApi, 'followAuthor')
        .and.returnValue(of({}));

      facade.followAuthor(author, userId);

      let authorFromFacade: Author;

      const subscription = facade.authorById$(authorId).subscribe(val => authorFromFacade = val);

      expect(authorFromFacade.followers.length).toBe(1);

      subscription.unsubscribe();
    })
  })


})
