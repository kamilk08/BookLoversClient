import { UUID } from 'angular2-uuid';
import { ShelfResponse } from './shelf.response';

export interface BookcaseResponse {
  id: number
  guid: UUID
  readerGuid: UUID
  readerId: number
  shelvesCount: number
  booksCount: number
  bookcaseOptions: {
    capacity: number,
    privacy: number
  }
  shelves: ShelfResponse[]
}
