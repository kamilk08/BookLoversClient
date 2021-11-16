import { Quote } from "src/app/modules/api/quotes/models/quote.model";

export interface AddBookQuoteChange {
  quote: Quote
  quoteAdded: boolean
}
