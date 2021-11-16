import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Author } from '../api/authors/authors/models/author.model';
import { PageService } from '../shared/common/page.service';
import { QuoteFrom } from '../api/quotes/models/quote-from.model';
import { QuoteType } from '../api/quotes/models/quote-type';
import { Quote } from '../api/quotes/models/quote.model';
import { Book } from '../api/books/models';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class QuoteService {
  public quoteForm: FormGroup;

  constructor(private authService: AuthService) {
    this.createQuoteForm();
  }

  private createQuoteForm() {
    this.quoteForm = new FormGroup({
      content: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2555)])
    });
  }

  get quoteContent() {
    return this.quoteForm.get('content').value;
  }

  createAuthorQuote(author: Author) {
    const quoteFrom = new QuoteFrom(author.identification.guid, QuoteType.authorQuote);
    const addedBy = { id: this.authService.userId, guid: this.authService.userGuid };
    let quote = new Quote(this.quoteContent, quoteFrom, addedBy);

    return quote;
  };

  createBookQuote(book: Book) {
    const quoteFrom = new QuoteFrom(book.identification.guid, QuoteType.bookQuote);
    const addedBy = { id: this.authService.userId, guid: this.authService.userGuid };
    let quote = new Quote(this.quoteContent, quoteFrom, addedBy);

    return quote;
  }

}
