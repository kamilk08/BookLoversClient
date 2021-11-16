import { Adapter } from 'src/app/modules/shared/adapter';
import { Injectable } from '@angular/core';
import { Reader } from './models/reader.model';
import { ReaderDetails } from './models/reader-details.model';

@Injectable()
export class ReaderAdapter implements Adapter<Reader>{
  adapt(item: any): Reader {
    if (item === null) return undefined

    const user: Reader = {
      identification: { guid: item.guid, id: item.readerId },
      details: this.adaptReaderDetails(item.userName, item.role, item.joinedAt),
      email: item.email,
      status: item.status
    };
    return user;
  }

  private adaptReaderDetails(userName: string, role: string, joinedAt: Date) {
    return new ReaderDetails(userName, role, joinedAt);
  }

}
