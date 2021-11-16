import { Adapter } from 'src/app/modules/shared/adapter';
import { Injectable } from '@angular/core';
import { Identification } from '../../shared';
import { Book, BookAddedBy, BookPublisherCycle, BookSeries, BookPublisher, BookBasics, BookAuthor, BookDescription, BookDetails, BookCover } from './models';
import { ALL_SUBCATEGORIES } from '../../books/common/categories';

@Injectable()
export class BookAdapter implements Adapter<Book>{
  constructor() { }

  adapt(item: any): Book {
    if (!item)
      return undefined;

    let book: Book = null;

    book = {
      identification: this.getBookIdentification(item),
      authors: this.getBookAuthors(item),
      basics: this.getBookBasics(item),
      publisher: this.getBookPublisher(item),
      details: this.getBookDetails(item),
      description: this.getBookDescription(item),
      cover: this.getBookCover(item),
      series: this.getBookSeries(item),
      publisherCycles: this.getBookCycles(item),
      reviews: this.getBookReviews(item),
      addedBy: this.getAddedBy(item),
      hashTags: Array.from(item.bookHashTags).map((item: any) => {
        return { hashTagValue: item }
      }),
      setBookId: Book.prototype.setBookId,
      hasSeries: Book.prototype.hasSeries
    }
    return book;
  }

  private getAddedBy(item: any) {
    return new BookAddedBy(item.readerId, item.readerGuid, null);
  }

  private getBookReviews(item: any) {
    return Array.from(item.reviews).map((r: any) => r.id);
  }

  private getBookCycles(item: any) {
    return item.cycles ? Array.from(item.cycles).map((pc: any) => new BookPublisherCycle(pc.id, pc.guid)) : [];
  }

  private getBookSeries(item: any) {
    return item.series ? new BookSeries(item.series.id, item.series.guid, item.positionInSeries) : undefined;
  }

  private getBookPublisher(item: any) {
    return new BookPublisher(item.publisher.id, item.publisher.guid, item.publicationDate);
  }

  private getBookBasics(item: any) {
    return new BookBasics(item.title, item.isbn, ALL_SUBCATEGORIES.find(p => p.id == item.subCategoryId));
  }

  private getBookAuthors(item: any) {
    return Array.from(item.authors).map((a: any) => new BookAuthor(a.id, a.guid));
  }

  private getBookIdentification(item: any) {
    return { id: item.id, guid: item.guid } as Identification;
  }

  private getBookDescription(item: any) {
    return new BookDescription(item.description, item.descriptionSource);
  }

  private getBookDetails(item: any) {
    return new BookDetails(item.pages, item.languageId);
  }

  private getBookCover(item: any) {
    return new BookCover(item.coverTypeId, item.coverSource, item.isCoverAdded);
  }

}
