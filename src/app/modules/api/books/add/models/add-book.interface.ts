import { UUID } from 'angular2-uuid';
import { AddBookBasics } from './add-book-basics.interface';
import { AddBookCover } from './add-book-cover.interface';
import { AddBookDescription } from './add-book-description.interface';
import { AddBookDetails } from './add-book-details.interface';

export interface AddBookModel {
  bookGuid: UUID;
  basics: AddBookBasics
  details: AddBookDetails
  cover: AddBookCover
  description: AddBookDescription
  seriesGuid: UUID
  cycles: UUID[]
  hashTags: string[]
  positionInSeries: number
  authors: UUID[]
  addedBy: UUID
}
