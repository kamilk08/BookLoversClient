import { Adapter } from 'src/app/modules/shared/adapter';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/modules/shared/models/like';
import { Identification } from 'src/app/modules/shared/models/identification';
import { Quote } from './models/quote.model';
import { QuoteContent } from './models/quote-content.model';

@Injectable()
export class QuoteAdapter implements Adapter<Quote>{
  adapt(item: any): Quote {
    if (!item)
      throw Error('Invalid quote.');

    let quote: Quote = {
      identification: this.getIdentification(item),
      content: this.getQuoteContent(item),
      addedBy: { id: item.readerId, guid: item.readerGuid },
      quoteFrom: this.getQuoteFrom(item),
      likes: this.getLikes(item),
      addLike: Quote.prototype.addLike,
      removeLike: Quote.prototype.removeLike,
      isLikedBy: Quote.prototype.isLikedBy,
      setQuoteId: Quote.prototype.setQuoteId
    };
    return quote;
  }

  private getIdentification(item: any) {
    return { id: item.id, guid: item.guid } as Identification
  }

  private getQuoteContent(item: any) {
    return { quoteText: item.quote, date: item.addedAt } as QuoteContent
  }

  private getQuoteFrom(item: any) {
    return { quoteFromGuid: item.quoteFromGuid, quoteFromId: item.quoteFromId, quoteType: item.quoteType }
  }

  private getLikes(item: any) {
    return Array.from(item.quoteLikes).map((quoteLike: any) => {
      const like: Like = {
        id: quoteLike.id,
        readerId: quoteLike.readerId
      };
      return like;
    })
  }
}
