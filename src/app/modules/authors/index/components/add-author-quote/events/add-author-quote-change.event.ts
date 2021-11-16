import { Quote } from 'src/app/modules/api/quotes/models/quote.model';

export interface AddAuthorQuoteChange {
  quote: Quote,
  isConfirmed: boolean
}
