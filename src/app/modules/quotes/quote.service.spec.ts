import { TestBed } from "@angular/core/testing";
import { UUID } from "angular2-uuid";
import { AuthorBasics } from "../api/authors/authors/models/author-basics.model";
import { AuthorDescription } from "../api/authors/authors/models/author-description.model";
import { AuthorDetails } from "../api/authors/authors/models/author-details.model";
import { Author } from "../api/authors/authors/models/author.model";
import { Book, BookAuthor, BookBasics, BookPublisher } from "../api/books/models";
import { AuthService } from "../auth/services/auth.service";
import { CookiesService } from "../auth/services/cookies.service";
import { TokenService } from "../auth/services/token.service";
import { ALL_SUBCATEGORIES } from "../books/common/categories";
import { FullName, Sex } from "../shared";
import { QuoteService } from "./quote.service";

describe('QUOTE_SERVICE', () => {

  let service: QuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, TokenService, CookiesService, QuoteService]
    });

    service = TestBed.get(QuoteService);
  });


  describe('CREATE_AUTHOR_QUOTE', () => {
    it('should create author quote with valid content', () => {

      const author = new Author(new AuthorBasics(new FullName('first', 'second'), Sex.Male.id),
        new AuthorDescription('about', 'source', 'website'), new AuthorDetails(new Date(), new Date(), 'birthplace', 1),
        [ALL_SUBCATEGORIES[0].id]);

      service.quoteForm.get('content').setValue('quote_content');

      const quote = service.createAuthorQuote(author);

      expect(quote).toBeDefined();
      expect(quote.content.quoteText).toEqual('quote_content');
    });

  });

  describe('CREATE_BOOK_QUOTE', () => {
    it('should create book quote with valid content', () => {

      const book = new Book(new BookBasics('title', 'isbn', ALL_SUBCATEGORIES[0]),
        [new BookAuthor(1, UUID.UUID())], new BookPublisher(1, UUID.UUID(), new Date()))

      service.quoteForm.get('content').setValue('quote-content');

      const quote = service.createBookQuote(book);

      expect(quote).toBeDefined();
      expect(quote.content.quoteText).toEqual('quote-content');


    });
  });

});
