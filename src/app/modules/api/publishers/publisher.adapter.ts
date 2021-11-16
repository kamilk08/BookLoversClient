import { Adapter } from 'src/app/modules/shared/adapter';
import { Injectable } from '@angular/core';
import { Publisher } from './models/publisher.model';

@Injectable()
export class PublisherAdapter implements Adapter<Publisher>{
  adapt(item: any): Publisher {

    if (!item)
      return undefined;

    const publisher: Publisher = {
      identification: {
        id: item.id,
        guid: item.guid
      },
      name: item.name,
      books: item.books,
      cycles: item.cycles,
      setPublisherId: Publisher.prototype.setPublisherId
    };

    return publisher;
  }

}
