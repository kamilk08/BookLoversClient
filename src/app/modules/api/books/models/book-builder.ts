import { Book } from './book.model';
import { BookBasics } from './book-basics.model';
import { BookPublisher } from './book-publisher.model';
import { BookSeries } from './series.model';
import { BookDescription } from './book-description.model';
import { BookDetails } from './book-details.model';
import { BookCover } from './book-cover.model';
import { Injectable } from '@angular/core';
import { BookAddedBy } from './book-added-by.model';
import { BookAuthor } from './book-author.model';
import { UUID } from 'angular2-uuid';
import { BookHashTag } from './book-hash-tag';
import { BookPublisherCycle } from './book-publisher-cycle.model';

@Injectable()
export class BookBuilder {

  private book: Book;

  initialize(basics: BookBasics, bookAuthors: BookAuthor[], publisher: BookPublisher) {
    this.book = new Book(basics, bookAuthors, publisher);
    return this;
  }

  withSeries(bookSeries: BookSeries) {
    this.book.series = bookSeries;
    return this;
  }

  withDescritpion(bookDescription: BookDescription) {
    this.book.description = bookDescription;
    return this;
  }

  withDetails(bookDetails: BookDetails) {
    this.book.details = bookDetails;
    return this;
  }

  withCover(bookCover: BookCover) {
    this.book.cover = bookCover;
    return this;
  }

  withCycles(cycles: BookPublisherCycle[]) {
    this.book.publisherCycles = cycles;
    return this;
  }

  withAddedBy(addedById: number, addedByGuid: UUID, addedByName?: string) {
    this.book.addedBy = new BookAddedBy(addedById, addedByGuid, addedByName);
    return this;
  }

  withReviews(reviews: number[]) {
    reviews.forEach(reviewId => this.book.reviews.push(reviewId));
    return this;
  }

  withHashTags(hashTags: string[]) {
    this.book.hashTags = hashTags.map(v => v as unknown as BookHashTag);
    return this;
  }

  getBook() {
    return this.book;
  }

}
