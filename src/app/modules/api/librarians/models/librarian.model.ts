import { UUID } from 'angular2-uuid';
import { Identification } from 'src/app/modules/shared';

export class Librarian {
  public identification: Identification;
  public readerGuid: UUID;

  constructor(identificaion: Identification,readerGuid:UUID) {
    this.identification = identificaion;
    this.readerGuid = readerGuid;
  }

  setLibrarianId(librarianId: number) {
    if (this.identification.id)
      return;

    this.identification.id = librarianId;
  }
}
