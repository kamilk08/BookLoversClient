import { Injectable } from "@angular/core";
import * as fromSelectors from '../module.selectors';
import * as fromModule from '../index';
import { Store } from '@ngrx/store';
import { SELECT_QUOTE } from './quote.actions';
import { OrderedQuery, Query } from 'src/app/modules/shared/common/query';
import { SELECT_AUTHOR_QUOTES_PAGE, SELECT_BOOK_QUOTES_PAGE, SELECT_READER_QUOTES_PAGE } from '../quotes-pagination/quotes-pagination.actions';
import { ADD_AUTHOR_QUOTE, ADD_BOOK_QUOTE } from "../add-quotes/add-quote.actions";
import { Quote } from "src/app/modules/api/quotes/models/quote.model";
import { LIKE_QUOTE, UNLIKE_QUOTE } from "../quote-likes/quote-likes.actions";
import { filter, map } from "rxjs/operators";

@Injectable()
export class QuotesFacade {

  public readonly bookQuotes$ = (bookId: number, count: number) => this.store.select(fromSelectors.getBookQuotes$(bookId, count));
  public readonly bookQuotesPageResult$ = this.store.select(fromSelectors.bookQuotesPageResult);
  public readonly bookPaginatedQuotes$ = this.store.select(fromSelectors.paginatedBookQuotes);
  public readonly isProcessingBookQuotes$ = this.store.select(fromSelectors.isProcessingBookQuotes);
  public readonly currentBookQuotesPage$ = this.store.select(fromSelectors.currentBookQuotesPage);
  public readonly totalBookQuotes$ = this.store.select(fromSelectors.totalBookQuotes);

  public readonly takeBookQuotes$ = (count: number) => this.bookPaginatedQuotes$
    .pipe(
      filter(f => f !== undefined),
      map(quotes => quotes.filter((v, i) => i < count))
    );
  public readonly isBookQuoteLikedBy$ = (quoteId: number, userId: number) => this.bookPaginatedQuotes$
    .pipe(
      filter(f => f !== undefined),
      map(s => s.filter(f => f.identification.id === quoteId)[0]),
      filter(f => f !== undefined),
      map(s => s.isLikedBy(userId))
    );

  public readonly authorQuotesPageResult$ = this.store.select(fromSelectors.authorQuotesPageResult);
  public readonly currentAuthorQuotesPage$ = this.store.select(fromSelectors.currentAuthorQuotesPage);
  public readonly totalAuthorQuotes$ = this.store.select(fromSelectors.totalAuthorQuotes);
  public readonly isAuthorQuoteLikedBy$ = (quoteId: number, userId: number) => this.store.select(fromSelectors.isAuthorQuoteLikedBy(quoteId, userId));

  public readonly readerPaginatedQuotes$ = this.store.select(fromSelectors.paginatedReaderQuotes);
  public readonly readerQuotesPageResult$ = this.store.select(fromSelectors.readerQuotesPageResult);
  public readonly isProcessingReaderQuotes$ = this.store.select(fromSelectors.isProcessingReaderQuotes);

  public readonly addedQuote$ = this.store.select(fromSelectors.addedQuote);
  public readonly processingNewQuote$ = this.store.select(fromSelectors.processingNewQuote);

  public readonly likedQuote$ = this.store.select(fromSelectors.likedQuote);

  public readonly authorPaginatedQuotes$ = this.store.select(fromSelectors.paginatedAuthorQuotes);

  public isProcessingAuthorQuotes$ = this.store.select(fromSelectors.isProcessingAuthorQuotes);


  constructor(private store: Store<fromModule.QuotesState>) { }

  selectQuote(id: number) {
    this.store.dispatch(SELECT_QUOTE({ payload: { id } }));
  }

  selectBookQuotes(bookId: number, query: OrderedQuery) {
    this.store.dispatch(SELECT_BOOK_QUOTES_PAGE({ payload: { bookId, query } }));
  }

  selectAuthorQuotes(authorId: number, query: OrderedQuery) {
    this.store.dispatch(SELECT_AUTHOR_QUOTES_PAGE({ payload: { authorId, query } }));
  }

  selectReaderQuotes(readerId: number, query: OrderedQuery) {
    this.store.dispatch(SELECT_READER_QUOTES_PAGE({ payload: { readerId, query } }));
  }

  addBookQuote(quote: Quote) {
    this.store.dispatch(ADD_BOOK_QUOTE({ payload: { quote } }));
  }

  addAuthorQuote(quote: Quote) {
    this.store.dispatch(ADD_AUTHOR_QUOTE({ payload: { quote } }));
  }

  likeQuote(quote: Quote, userId: number) {
    this.store.dispatch(LIKE_QUOTE({ payload: { quote: quote, userId: userId } }))
  }

  unLikeQuote(quote: Quote, userId: number) {
    this.store.dispatch(UNLIKE_QUOTE({ payload: { quote: quote, userId: userId } }))
  }
}
