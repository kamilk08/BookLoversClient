import { UUID } from "angular2-uuid";

export class BlockAccount {
  readonly blockedReaderGuid: UUID;

  constructor(readerGuid: UUID) {
    this.blockedReaderGuid = readerGuid;
  }
}
