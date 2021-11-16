import { PublisherCycle } from './publisher-cycle.model';
import { UUID } from 'angular2-uuid';

export class AddPublisherCycle {
  publisherGuid: UUID
  cycleGuid: UUID
  cycle: string

  constructor(cycle: PublisherCycle) {
    this.publisherGuid = cycle.publisher.guid;
    this.cycleGuid = cycle.identification.guid;
    this.cycle = cycle.name;
  }

}
