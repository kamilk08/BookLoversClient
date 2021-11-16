
import { UUID } from 'angular2-uuid';
import { Quote } from './quote.model';

export class AddQuote {

  public readonly quoteGuid: UUID;
  public readonly quotedGuid: UUID;
  public readonly quote: string;
  public readonly addedAt: Date;

  constructor(quote: Quote) {
    this.quoteGuid = quote.identification.guid;
    this.quotedGuid = quote.quoteFrom.quoteFromGuid;
    this.quote = quote.content.quoteText;
    this.addedAt = quote.content.date;
  }
}
