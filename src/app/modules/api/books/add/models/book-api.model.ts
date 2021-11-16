import { UUID } from 'angular2-uuid';
import { Book } from '../../models';
import { AddBookBasics } from './add-book-basics.interface';
import { AddBookCover } from './add-book-cover.interface';
import { AddBookDescription } from './add-book-description.interface';
import { AddBookDetails } from './add-book-details.interface';
import { AddBookModel } from './add-book.interface';

export class BookModelApiModel implements AddBookModel {
  bookGuid: UUID;
  basics: AddBookBasics;
  details: AddBookDetails;
  cover: AddBookCover;
  description: AddBookDescription;
  seriesGuid: UUID;
  cycles: UUID[];
  hashTags: string[];
  positionInSeries: number;
  authors: UUID[];
  addedBy: UUID;

  constructor(book: Book) {
    this.bookGuid = book.identification.guid,
      this.basics = {
        isbn: book.basics.isbn,
        title: book.basics.title,
        publicationDate: book.publisher.published,
        category: book.basics.bookCategory.category.id,
        subCategory: book.basics.bookCategory.id,
        publisherGuid: book.publisher.publisherGuid
      },
      this.details = {
        pages: book.details.pages,
        language: book.details.language.id
      },
      this.cover = {
        coverSource: book.cover.source,
        coverType: book.cover.coverType.id,
        isCoverAdded: book.cover.isCoverAdded
      },
      this.description = {
        content: book.description.content,
        descriptionSource: book.description.source
      },
      this.seriesGuid = book.series.seriesGuid
      this.cycles = book.publisherCycles.map(v => v.guid),
      this.hashTags = book.hashTags.map(v => v.hashTagValue),
      this.positionInSeries = book.series.positionInSeries
      this.authors = book.authors.map(v => v.authorGuid),
      this.addedBy = book.addedBy.addedByGuid
  }
}
