import { UUID } from 'angular2-uuid';
import { Book } from 'src/app/modules/api/books/models';
import { Bookcase } from '../../../../bookcases/models';

export class RemoveFromBookcase {
  public readonly bookcaseGuid: UUID
  public readonly bookGuid: UUID

  constructor(bookcase: Bookcase, book: Book) {
    this.bookcaseGuid = bookcase.identification.guid;
    this.bookGuid = book.identification.guid
  }
}
