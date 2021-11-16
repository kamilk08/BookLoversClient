import { Injectable } from '@angular/core';
import { map, filter, mergeMap } from 'rxjs/operators';
import { SeriesFacade } from '../../../series/store/series/series.facade';
import { Series } from '../../../api/series/models/series.model';
import { BookFacade } from '../../store/book.facade';
import { QuotesFacade } from 'src/app/modules/quotes/store/quotes/quote.facade';
import { PublisherFacade } from 'src/app/modules/publisher/store/publishers/publisher.facade';
import { AuthorFacade } from 'src/app/modules/authors/store/authors/author.facade';
import { noNullOrUndefined } from 'src/app/modules/shared/common/operator-extensions';
import { Book } from 'src/app/modules/api/books/models';

@Injectable()
export class BookViewService {

  public readonly starsOptions = {
    'FIVE': 5,
    'FOUR': 4,
    'THREE': 3,
    'TWO': 2,
    'ONE': 1
  }

  public readonly authorOtherBooks$ = (bookId: number, count: number) => {
    return this.bookFacade.bookById$(bookId)
      .pipe(
        filter(b => b !== undefined),
        mergeMap((book) => this.authorFacade.multipleAuthorsBooks$(book.authors.map(s => s.authorId))),
        mergeMap((bookIds) => this.bookFacade.multipleBooks$(bookIds)),
        filter((books: Book[]) => books.some(a => a !== undefined)),
        map(books => books.filter(s => s.identification.id !== bookId)),
        map(books => books.filter((v, i) => i < count))
      );
  }

  public readonly authorOtherBooksCount$ = (bookId: number) => {
    return this.bookFacade.bookById$(bookId)
      .pipe(
        filter(b => b !== undefined),
        mergeMap((book) => this.authorFacade.multipleAuthorsBooks$(book.authors.map(s => s.authorId))),
        mergeMap((bookIds) => this.bookFacade.multipleBooks$(bookIds)),
        filter((books: Book[]) => books.some(a => a !== undefined)),
        map(books => books.filter(s => s.identification.id !== bookId)),
        map(s => s.length)
      );
  }

  public readonly bookAuthors$ = (bookId: number) => {
    return this.bookFacade.bookById$(bookId)
      .pipe(
        filter(noNullOrUndefined()),
        mergeMap((s: Book) => this.authorFacade.multipleAuthors$(s.authors.map(s => s.authorId)))
      )
  }

  public getStars(starOption: string) {
    return this.starsOptions[starOption];
  }

  constructor(
    public readonly authorFacade: AuthorFacade,
    public readonly publisherFacade: PublisherFacade,
    public readonly quotesFacade: QuotesFacade,
    public readonly seriesFacade: SeriesFacade,
    public readonly bookFacade: BookFacade,) { }


  public hasSeriesMoreBooks(bookSeries: Series, currentBookId: number) {
    if (bookSeries)
      return bookSeries.books.filter(f => f !== currentBookId).length > 0;

    return false;
  }

  public isEven(num: number) {
    return num % 2 !== 0;
  }

  public skipSeriesBook(series: Series, bookId: number) {
    return series.books.filter(f => f !== bookId);
  }
}
