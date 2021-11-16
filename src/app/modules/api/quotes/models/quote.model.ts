import { Identification } from 'src/app/modules/shared/models/identification';
import { UUID } from 'angular2-uuid';
import { QuoteContent } from './quote-content.model';
import { Like } from 'src/app/modules/shared/models/like';
import { QuoteFrom } from './quote-from.model';

export class Quote {
  public identification: Identification
  public content: QuoteContent
  public addedBy: Identification
  public quoteFrom: QuoteFrom

  public likes: Like[]

  constructor(quote: string, quoteFrom: QuoteFrom, addedBy: Identification) {
    this.identification = { id: null, guid: UUID.UUID() };
    this.content = new QuoteContent(quote, new Date());
    this.quoteFrom = quoteFrom;
    this.addedBy = addedBy

    this.likes = [];
  }

  public setQuoteId(id: number) {
    if (this.identification.id)
      return;

    this.identification.id = id;
  }

  public addLike(readerId: number) {
    this.likes.push({ id: null, readerId: readerId });
  }

  public removeLike(readerId: number) {
    this.likes = this.likes.filter(p => p.readerId !== readerId);
  }

  public isLikedBy(readerId: number) {
    const like = this.likes.find(p => p.readerId === readerId);
    return like ? true : false;
  }
}
