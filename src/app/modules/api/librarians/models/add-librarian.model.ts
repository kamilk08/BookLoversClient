import { UUID } from 'angular2-uuid';

export class AddLibrarianModel {
  readonly readerGuid: UUID;
  readonly librarianGuid: UUID;

  constructor(readerGuid:UUID){
    this.readerGuid = readerGuid;
    this.librarianGuid = UUID.UUID();
  }
}
