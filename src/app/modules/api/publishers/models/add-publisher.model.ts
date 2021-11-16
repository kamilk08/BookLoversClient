import { UUID } from 'angular2-uuid';
import { Publisher } from './publisher.model';

export class AddPublisher {
  public readonly publisherGuid: UUID
  public readonly name: string

  constructor(publisher: Publisher) {
    this.publisherGuid = publisher.identification.guid;
    this.name = publisher.name;
  }
}

