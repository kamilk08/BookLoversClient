import { UUID } from 'angular2-uuid';

export class SolvedBy {
  public readonly librarianGuid: UUID

  constructor(librarianGuid: UUID) {
    this.librarianGuid = librarianGuid;
  }
}
