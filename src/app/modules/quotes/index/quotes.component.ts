import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subject } from "rxjs";
import { filter, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { Book } from "../../api/books/models";
import { AuthService } from "../../auth/services/auth.service";
import { AuthorFacade } from "../../authors/store/authors/author.facade";
import { BookFacade } from "../../books/store/book.facade";
import { noNullOrUndefined } from "../../shared/common/operator-extensions";
import { PageChangeEvent } from "../../shared/common/page-change.event";
import { QuoteLikeEvent } from "../../shared/models/quote-like.event";
import { QuotesWebPageFacade } from "../store/quotes-web-page/quotes-web-page.facade";
import { QuotesFacade } from "../store/quotes/quote.facade";


@Component({
  selector: 'qoutes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    public readonly authService: AuthService,
    public readonly quotesFacade: QuotesFacade,
    public readonly pageFacade: QuotesWebPageFacade,
    public readonly bookFacade: BookFacade,
    public readonly authorFacade: AuthorFacade
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        filter(noNullOrUndefined()),
        map((paramMap: ParamMap) => +paramMap.get('id')),
        tap(bookId => this.pageFacade.setBookId(bookId)),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    this.pageFacade.bookQuotesId$
      .pipe(
        filter(noNullOrUndefined()),
        switchMap((id: number) => this.bookFacade.bookById$(id)),
        filter(noNullOrUndefined()),
        tap((book: Book) => book.authors.forEach(f => this.authorFacade.selectSingle(f.authorId))),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onQuoteLike(event: QuoteLikeEvent) {
    event.quote.isLikedBy(this.authService.userId) ?
      this.quotesFacade.unLikeQuote(event.quote, this.authService.userId) :
      this.quotesFacade.likeQuote(event.quote, this.authService.userId);
  }

  onChangeSortOrder(descending: boolean) {
    this.pageFacade.changeBookQuotesOrder(descending);
  }

  onQuotesPageChange(event: PageChangeEvent) {
    this.pageFacade.changeBookQuotesPage(event.currentPage - 1);
  }

  public readonly bookTitle$ = this.pageFacade.bookQuotesId$
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((bookId: number) => this.bookFacade.bookById$(bookId)),
      filter(noNullOrUndefined()),
      map((book: Book) => book.basics.title)
    );

  public readonly authorQuote$ = this.pageFacade.bookQuotesId$
    .pipe(
      filter(noNullOrUndefined()),
      switchMap((bookId: number) => this.bookFacade.bookById$(bookId)),
      filter(noNullOrUndefined()),
      map((book: Book) => book.authors.map(s => s.authorId)[0]),
      switchMap(authorId => this.authorFacade.authorById$(authorId))
    );

}
