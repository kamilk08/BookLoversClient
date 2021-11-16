import { createSelector } from '@ngrx/store';
import { quotesState, QuotesState } from '..';
import { QuotesPagination, QuotesPaginationState } from '../quotes-pagination/quotes-pagination.reducer';
import { Quotes } from './quote.reducer';

const quotes = createSelector(quotesState, (state: QuotesState) => {
  if (state) return state.quotes;

  return undefined;
});
const pagination = createSelector(quotesState, (state: QuotesState) => {
  if (state) return state.quotePagination;

  return undefined;
})

const bookQuotes = createSelector(pagination, (state: QuotesPagination) => {
  if (state) return state.booksQuotes;

  return undefined;
});
const authorQuotes = createSelector(pagination, (state: QuotesPagination) => {
  if (state) return state.authorQuotes;

  return undefined;
});
const readerQuotes = createSelector(pagination, (state: QuotesPagination) => {
  if (state) return state.readerQuotes;

  return undefined;
});

export const getBookQuotes$ = (bookId: number, count: number) => createSelector(quotes, (state: Quotes) => {
  if (bookId) {
    let entities = state.ids.map(id => state.entities[id]).filter(f => f !== undefined);
    return entities.take(count);
  }
});

export const bookQuotesPageResult = createSelector(bookQuotes, (state: QuotesPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});
export const paginatedBookQuotes = createSelector(bookQuotes, (state: QuotesPaginationState) => {
  if (state) return state.entities;

  return undefined;
});
//+1 IS ADDED BECAUSE FIRST PAGE HAS ZERO INDEX
//AND CLIENT PAGINATION STARTS FROM PAGE INDEX = 1;
export const currentBookQuotesPage = createSelector(bookQuotes, (state: QuotesPaginationState) => {
  if (state && state.pageResult) return state.pageResult.page + 1;
});

export const totalBookQuotes = createSelector(bookQuotes, (state: QuotesPaginationState) => {
  if (state && state.pageResult) return state.pageResult.totalItems;
});

export const isProcessingBookQuotes = createSelector(bookQuotes, (state: QuotesPaginationState) => {
  if (state) return state.processing;

  return undefined;
});

export const authorQuotesPageResult = createSelector(authorQuotes, (state: QuotesPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});

//+1 IS ADDED BECAUSE FIRST PAGE HAS ZERO INDEX
//AND CLIENT PAGINATION STARTS FROM PAGE INDEX = 1;
export const currentAuthorQuotesPage = createSelector(authorQuotes, (state: QuotesPaginationState) => {
  if (state && state.pageResult) return state.pageResult.page + 1;
});

export const totalAuthorQuotes = createSelector(authorQuotes, (state: QuotesPaginationState) => {
  if (state && state.pageResult) return state.pageResult.totalItems;
});

export const isAuthorQuoteLikedBy = (quoteId: number, userId: number) => createSelector(authorQuotes, (state: QuotesPaginationState) => {
  if (state && state.entities) {
    return state.entities.filter(f => f.identification.id === quoteId)[0]
      .isLikedBy(userId)
  }

})


// public readonly isQuoteLikedBy$ = (quoteId: number, userId: number) => this.quotesFacade.authorPaginatedQuotes$
// .pipe(
//   filter(f => f !== undefined),
//   map(s => s.filter(f => f.identification.id === quoteId)[0]),
//   map(s => s.isLikedBy(userId))
// );

export const paginatedAuthorQuotes = createSelector(authorQuotes, (state: QuotesPaginationState) => {
  if (state) return state.entities;

  return undefined;
});

export const isProcessingAuthorQuotes = createSelector(authorQuotes, (state: QuotesPaginationState) => {
  if (state) return state.processing;

  return undefined;
});

export const readerQuotesPageResult = createSelector(readerQuotes, (state: QuotesPaginationState) => {
  if (state) return state.pageResult;

  return undefined;
});
export const paginatedReaderQuotes = createSelector(readerQuotes, (state: QuotesPaginationState) => {
  if (state) return state.entities;

  return undefined;

});
export const isProcessingReaderQuotes = createSelector(readerQuotes, (state: QuotesPaginationState) => {
  if (state) return state.processing;

  return undefined;
});
