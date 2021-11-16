import { Injectable } from '@angular/core';
import { Shelf } from 'src/app/modules/bookcases/models';
import { SHELF_CATEGORIES } from 'src/app/modules/bookcases/models/shelf-categories';
import { Adapter } from 'src/app/modules/shared';

@Injectable()
export class ShelfAdatper implements Adapter<Shelf>{
  adapt(item: any) {
    if (item === null)
      return null;

    let shelf: Shelf = {
      identification: { id: item.id, guid: item.guid },
      category: SHELF_CATEGORIES.find(p => p.id === item.shelfCategory),
      name: item.shelfName,
      books: Array.from(item.publications).map((m: any) => m.id),
      changeShelfName: Shelf.prototype.changeShelfName,
      setShelfId: Shelf.prototype.setShelfId
    };

    return shelf;
  }

}
