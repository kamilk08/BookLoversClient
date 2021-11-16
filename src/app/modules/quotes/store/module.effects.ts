import { AddQuoteEffects } from "./add-quotes/add-quote.effects";
import { QuoteLikesEffects } from "./quote-likes/quote-likes.effects";
import { QuotesPaginationEffects } from "./quotes-pagination/quotes-pagination.effects";
import { QuotesWebPageEffects } from "./quotes-web-page/quotes-web-page.effects";

export const moduleEffects: any[] = [QuotesPaginationEffects,
  AddQuoteEffects, QuoteLikesEffects, QuotesWebPageEffects]
