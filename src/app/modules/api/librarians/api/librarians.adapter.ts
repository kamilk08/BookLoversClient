
import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/modules/shared';
import { Librarian } from '../models/librarian.model';

@Injectable()
export class LibrariansAdapter implements Adapter<Librarian> {
  adapt(item: any): Librarian {
    const librarian: Librarian = new Librarian({ id: item.id, guid: item.guid }, item.readerGuid);

    return librarian;
  }



}
