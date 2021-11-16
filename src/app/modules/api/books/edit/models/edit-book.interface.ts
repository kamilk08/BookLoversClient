import { UUID } from 'angular2-uuid';
import { EditBookBasics } from './edit-book-basics.interface';
import { EditBookCover } from './edit-book-cover.interface';
import { EditBookDescription } from './edit-book-description.interface';
import { EditBookDetails } from './edit-book-details.interface';

export interface EditBookInterface {
  bookGuid: UUID;
  basics: EditBookBasics
  details: EditBookDetails
  cover: EditBookCover
  description: EditBookDescription
  seriesGuid: UUID
  cycles: UUID[]
  hashTags: string[]
  positionInSeries: number
  authors: UUID[]
  addedBy: UUID
}
