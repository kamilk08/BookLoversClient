import { Injectable } from '@angular/core';
import { ShelfRecord } from './models/shelf-record.model';
import { Adapter } from 'src/app/modules/shared';

@Injectable()
export class ShelfRecordAdapter implements Adapter<ShelfRecord>{
    adapt(item: any): ShelfRecord {
        if (!item)
            return undefined;

        const shelfRecord: ShelfRecord = {
            id: item.id,
            shelfId: item.shelfId,
            bookId: item.bookId,
            addedAt: item.addedAt,
            isActive: item.isActive
        };

        return shelfRecord;
    }

}
