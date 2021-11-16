import { Identification } from 'src/app/modules/shared/models/identification';
import { BookBasics } from './book-basics.model';
import { BookPublisher } from './book-publisher.model';
import { BookDescription } from './book-description.model';
import { BookDetails } from './book-details.model';
import { BookCover } from './book-cover.model';
import { UUID } from 'angular2-uuid';
import { BookSeries } from './series.model';
import { BookAddedBy } from './book-added-by.model';
import { BookHashTag } from './book-hash-tag';
import { BookAuthor } from './book-author.model';
import { BookPublisherCycle } from './book-publisher-cycle.model';

export class Book {
  public identification: Identification
  public basics: BookBasics
  public publisher: BookPublisher
  public description: BookDescription
  public details: BookDetails
  public cover: BookCover
  public series: BookSeries
  public addedBy: BookAddedBy

  public authors: BookAuthor[];
  public publisherCycles: BookPublisherCycle[];
  public reviews: number[]
  public hashTags: BookHashTag[]

  constructor(basics: BookBasics, bookAuthors: BookAuthor[], publisher: BookPublisher) {
    this.identification = {
      id: null,
      guid: UUID.UUID()
    }
    this.basics = basics;
    this.publisher = publisher;
    this.reviews = [];
    this.authors = bookAuthors;
  }

  setBookId(bookId: number) {
    this.identification.id = bookId;
  }

  hasSeries() {
    if (this.series !== undefined)
      if (this.series.seriesId !== undefined)
        return true;

    return false;
  }
}
