import { UUID } from 'angular2-uuid';
import { Shelf } from '../../../../bookcases/models';

export class ChangeShelf {

  public readonly bookcaseGuid: UUID;
  public readonly newShelfGuid: UUID;
  public readonly oldShelfGuid: UUID;
  public readonly bookGuid: UUID;

  constructor(bookcaseGuid: UUID, shelves: { oldShelf: Shelf, newShelf: Shelf }, bookGuid: UUID) {
    this.bookcaseGuid = bookcaseGuid;
    this.newShelfGuid = shelves.newShelf.identification.guid;
    this.oldShelfGuid = shelves.oldShelf.identification.guid;
    this.bookGuid = bookGuid;
  }
}
