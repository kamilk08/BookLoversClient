import { Adapter } from 'src/app/modules/shared/adapter';
import { PublisherCycle } from './models/publisher-cycle.model';

export class PublisherCycleAdapter implements Adapter<PublisherCycle> {
  adapt(item: any): PublisherCycle {

    if (!item)
      return undefined;

    const cycle: PublisherCycle = {
      identification: { id: item.id, guid: item.guid },
      name: item.cycleName,
      publisher: {
        id: item.publisherId,
        guid: item.publisherGuid
      },
      books: item.cycleBooks,
      addBook: PublisherCycle.prototype.addBook,
      removeBook: PublisherCycle.prototype.removeBook,
      setPublisherCycleId: PublisherCycle.prototype.setPublisherCycleId
    };

    return cycle;
  }

}
