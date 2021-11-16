import { UUID } from 'angular2-uuid';
import { QuoteType, QUOTE_TYPES } from './quote-type';

export class QuoteFrom {
    public quoteFromGuid: UUID;
    public quoteFromId: number
    public quoteType: QuoteType

    constructor(guid: UUID, quoteType: number) {
        this.quoteFromGuid = guid;
        this.quoteType = QUOTE_TYPES.find(p => p.value == quoteType);
    }

    public static bookQuote(guid: UUID) {
        return new QuoteFrom(guid, QuoteType.bookQuote);
    }

    public static authorQuote(guid: UUID) {
        return new QuoteFrom(guid, QuoteType.authorQuote);
    }
}