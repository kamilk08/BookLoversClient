import { UUID } from 'angular2-uuid';
import { Book } from '../../models/book.model';
import { EditBookBasics } from './edit-book-basics.interface';
import { EditBookCover } from './edit-book-cover.interface';
import { EditBookDescription } from './edit-book-description.interface';
import { EditBookDetails } from './edit-book-details.interface';
import { EditBookInterface } from './edit-book.interface';

export class BookToEditModel implements EditBookInterface {
  bookGuid: UUID;
  basics: EditBookBasics;
  details: EditBookDetails;
  cover: EditBookCover;
  description: EditBookDescription;
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
      this.seriesGuid= book.series.seriesGuid,
      this.cycles= book.publisherCycles.map(v => v.guid),
      this.hashTags= book.hashTags.map(v => v.hashTagValue),
      this.positionInSeries= book.series.positionInSeries,
      this.authors= book.authors.map(v => v.authorGuid),
      this.addedBy= book.addedBy.addedByGuid

  }
}
