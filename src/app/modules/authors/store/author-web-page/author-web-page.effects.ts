import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Author } from "src/app/modules/api/authors/authors/models/author.model";
import { Quote } from "src/app/modules/api/quotes/models/quote.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { StatisticsFacade } from "src/app/modules/classification/statistics/store/statistics.facade";
import { QUOTES_PAGE_QUERY } from "src/app/modules/quotes/models/quotes-page.query";
import { QuotesFacade } from "src/app/modules/quotes/store/quotes/quote.facade";
import { SeriesPaginationFacade } from "src/app/modules/series/store/series-pagination/series-pagination.facade";
import { DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, DEFAULT_QUERY } from "src/app/modules/shared/common/query";
import { ModalService } from "src/app/modules/shared/services/modal.service";
import { EditAuthorComponent } from "../../edit-author/index/edit-author.component";
import { AuthorRemoveComponent } from "../../index/components/author-remove/author-remove.component";
import { RemoveAuthorDialogResult } from "../../index/components/author-remove/results/remove-author-dialog.result";
import { AUTHOR_BOOKS_PAGE_QUERY } from "../../models/author-books-page.model";
import { SORT_AUTHOR_BOOKS_BY_TITLE } from "../../models/author-sort-type";
import { AuthorFacade } from "../authors/author.facade";
import * as fromActions from './author-web-page.actions';
import { AuthorWebPageFacade } from "./author-web-page.facade";

@Injectable()
export class AuthorWebPageEffects {

  constructor(private readonly actions$: Actions,
    private readonly pageFacade: AuthorWebPageFacade,
    private readonly seriesPagination: SeriesPaginationFacade,
    private readonly authorsFacade: AuthorFacade,
    private readonly statisticsFacade: StatisticsFacade,
    private readonly quotesFacade: QuotesFacade,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
  ) {

  }

  setAuthorIdOnWebPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SET_AUTHOR_ID_ON_AUTHOR_WEB_PAGE),
      map(action => action.payload.authorId),
      withLatestFrom(this.pageFacade.maxBooksCount$, this.pageFacade.maxQuotesCount$, this.pageFacade.maxSeriesCount$),
      map(stream => ({ authorId: stream[0], booksCount: stream[1], quotesCount: stream[2], seriesCount: stream[3] })),
      tap(stream => this.authorsFacade.selectSingle(stream.authorId)),
      tap((stream) => this.authorsFacade.selectAuthorBooks(AUTHOR_BOOKS_PAGE_QUERY(stream.authorId))),
      tap((stream) => this.seriesPagination.selectSeriesByAuthor(stream.authorId, DEFAULT_QUERY(DEFAULT_PAGE, stream.seriesCount))),
      tap((stream) => this.statisticsFacade.selectAuthorStatistics(stream.authorId)),
      tap((stream) => this.quotesFacade.selectAuthorQuotes(stream.authorId, QUOTES_PAGE_QUERY(stream.quotesCount, DEFAULT_PAGE)))
    ), { dispatch: false });


  searchAuthorBooks$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.SEARCH_AUTHOR_BOOKS),
      map(action => action.payload.phrase),
      withLatestFrom(this.pageFacade.authorId$, this.pageFacade.maxBooksCount$),
      map(stream => ({ phrase: stream[0], authorId: stream[1], booksCount: stream[2] })),
      map(stream => AUTHOR_BOOKS_PAGE_QUERY(stream.authorId, DEFAULT_ITEMS_COUNT, DEFAULT_PAGE, true, SORT_AUTHOR_BOOKS_BY_TITLE, stream.phrase)),
      tap(query => this.authorsFacade.selectAuthorBooks(query)),
    ), { dispatch: false });

  nextAuthorBooksPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_AUTHOR_BOOKS_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.authorId$, this.pageFacade.maxBooksCount$, this.pageFacade.searchPhrase$),
      map(stream => ({ page: stream[0], authorId: stream[1], booksCount: stream[2], phrase: stream[3] })),
      map(stream => AUTHOR_BOOKS_PAGE_QUERY(stream.authorId, DEFAULT_ITEMS_COUNT, stream.page, true, SORT_AUTHOR_BOOKS_BY_TITLE, stream.phrase)),
      tap(query => this.authorsFacade.selectAuthorBooks(query))
    ), { dispatch: false });

  nextSeriesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_AUTHOR_SERIES_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.authorId$, this.pageFacade.maxSeriesCount$),
      map(stream => ({ page: stream[0], authorId: stream[1], seriesCount: stream[2] })),
      tap((stream) => this.seriesPagination.selectSeriesByAuthor(stream.authorId, DEFAULT_QUERY(stream.page, stream.seriesCount)))
    ), { dispatch: false });

  nextQuotesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.CHANGE_AUTHOR_QUOTES_PAGE),
      map(action => action.payload.page),
      withLatestFrom(this.pageFacade.authorId$, this.pageFacade.maxQuotesCount$),
      map(stream => ({ page: stream[0], authorId: stream[1], maxQuotes: stream[2] })),
      tap((stream) => this.quotesFacade.selectAuthorQuotes(stream.authorId, QUOTES_PAGE_QUERY(stream.maxQuotes, stream.page)))
    ), { dispatch: false });

  addOrRemoveQuoteLike$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.ADD_OR_REMOVE_QUOTE_LIKE),
      map(action => action.payload.quote),
      map((quote: Quote) => { return { quote: quote, isLikedBy: quote.isLikedBy(this.authService.userId) } }),
      tap((stream => stream.isLikedBy ? this.quotesFacade.unLikeQuote(stream.quote, this.authService.userId)
        : this.quotesFacade.likeQuote(stream.quote, this.authService.userId)))
    ), { dispatch: false });

  openEditAuthorModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_EDIT_AUTHOR_MODAL),
      tap(action => this.openEditAuthorModal(action.payload.author))
    ), { dispatch: false });


  openRemoveAuthorModal$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.OPEN_AUTHOR_REMOVE_MODAL),
      map(action => action.payload.author),
      switchMap(author => this.openRemoveAuthorModal(author).afterClose),
      tap((result: RemoveAuthorDialogResult) => result.confirmed ? this.authorsFacade.removeAuthor(result.author) : false),
    ), { dispatch: false })

  private openEditAuthorModal(author: Author) {
    this.modalService.withTitle('Edit author')
      .withContent(EditAuthorComponent)
      .withParams({ author: author })
      .withWidth('50rem')
      .openModal();
  };

  private openRemoveAuthorModal(author: Author) {
    return this.modalService.withTitle('Remove author')
      .withContent(AuthorRemoveComponent)
      .withWidth('30rem')
      .withParams({ author })
      .isCloseable(false)
      .openModal();
  }

}
