import { UUID } from 'angular2-uuid';

export class AddCustomShelf {

  public readonly bookcaseGuid: UUID;
  public readonly shelfGuid: UUID;
  public readonly shelfName: string;

  constructor(bookcaseGuid:UUID,shelfGuid:UUID,shelfName:string){
    this.bookcaseGuid = bookcaseGuid;
    this.shelfGuid = shelfGuid;
    this.shelfName = shelfName;
  }
}
